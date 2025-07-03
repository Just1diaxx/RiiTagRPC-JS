const fs = require('fs');
const path = require('path');
const readline = require('readline');
const RPC = require('discord-rpc');

const { OAuth2Client } = require('./oauth2client');
const { User } = require('./user');
const { RiitagWatcher } = require('./watcher');
const { RiitagTitleResolver } = require('./RiitagTitleResolver');

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')));
const clientId = config.oauth2.client_id;

class ConsoleUI {
    constructor() {
        this.width = process.stdout.columns || 80;
        this.height = process.stdout.rows || 24;

        this.title = '';
        this.message = '';
        this.footer = 'Press q to quit.';

        this.setupInput();
        this.render();
    }

    clearScreen() {
        process.stdout.write('\x1Bc'); // Clear screen ANSI
    }

    drawBox(contentLines, boxWidth, boxHeight) {
        const horizontalLine = '─'.repeat(boxWidth - 2);
        const top = `┌${horizontalLine}┐\n`;
        const bottom = `\n└${horizontalLine}┘`;

        let boxContent = '';

        for (let i = 0; i < boxHeight - 2; i++) {
            const line = contentLines[i] || '';
            const trimmed = line.length > boxWidth - 4 ? line.slice(0, boxWidth - 4) : line;
            const padded = trimmed.padEnd(boxWidth - 4, ' ');
            boxContent += `│ ${padded} │\n`;
        }

        return top + boxContent + bottom;
    }

    render() {
        this.clearScreen();

        const boxWidth = Math.min(this.width - 10, 60);
        const boxHeight = 10;

        const contentLines = [];

        contentLines.push(this.title.toUpperCase());
        contentLines.push('');
        contentLines.push(...this.message.split('\n'));

        const box = this.drawBox(contentLines, boxWidth, boxHeight);

        const topPadding = Math.floor((this.height - boxHeight) / 2);

        process.stdout.write('\n'.repeat(topPadding));
        process.stdout.write(box);

        process.stdout.write('\n'.repeat(this.height - topPadding - boxHeight - 1));
        process.stdout.write(this.footer + '\n');
    }

    showMessage(title, message) {
        this.title = title;
        this.message = message;
        this.render();
    }

    setupInput() {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) process.stdin.setRawMode(true);

        process.stdin.on('keypress', (str, key) => {
            if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
                this.clearScreen();
                process.exit(0);
            }
        });
    }
}

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}


async function updatePresence(rpcClient, riitag, ui) {
    if (!rpcClient) return;

    try {
        const gameId = riitag?.game_data?.last_played?.game_id || 'Unknown';
        const _console = String(riitag?.game_data?.last_played?.console || 'Unknown');
        const resolver = new RiitagTitleResolver();

        const gameName = await resolver.resolve(_console, gameId);

        await rpcClient.setActivity({
            details: `Playing ${await resolver.resolve(_console, gameId)}`,
            state: `On a ${capitalizeFirstLetter(_console)} console`,
            largeImageKey: `https://art.gametdb.com/wii/disc/EN/${gameId}.png`,
            largeImageText: await resolver.resolve(_console, gameId),
            smallImageKey: _console === 'wii' ? 'https://img.icons8.com/?size=100&id=b1EgLrlqDFZV&format=png&color=000000' : 'https://img.icons8.com/?size=100&id=19600&format=png&color=000000',
            smallImageText: `On a ${capitalizeFirstLetter(_console)} console`,
            instance: false,
            startTimestamp: riitag.game_data.last_played.time ? new Date(riitag.game_data.last_played.time) : undefined,
        });

        ui.showMessage('Presence Updated', `Playing: ${gameName}\nConsole: ${capitalizeFirstLetter(_console)}\nGame ID: ${gameId}`);
        console.log('[RPC] Presence updated:', gameId);
    } catch (err) {
        ui.showMessage('Error', err.message || 'Failed to update presence');
        console.error('[RPC] Error setting activity:', err);
    }
}

async function main() {
    const ui = new ConsoleUI();

    let userData;
    try {
        userData = require('./util').getUserData();
    } catch {
        const oauthClient = new OAuth2Client(config.oauth2);

        oauthClient.startServer(config.port);

        ui.showMessage('Auth Required', 'Open the browser to authorize:\n' + oauthClient.auth_url);

        const code = await oauthClient.waitForCode();
        const token = await oauthClient.getToken(code);
        userData = await token.getUser();

        require('./util').saveUserData(userData);
    }

    const user = new User(userData);

    const rpc = new RPC.Client({ transport: 'ipc' });

    rpc.on('ready', () => {
        ui.showMessage('RPC Ready', `Logged in as ${user.tag}`);

        const preferences = {
            checkInterval: 5,
            presenceTimeout: 1,
        };

        const watcher = new RiitagWatcher(preferences, user, (riitag) => updatePresence(rpc, riitag, ui), (title, message) => ui.showMessage(title, message));

        watcher.start();
    });

    rpc.login({ clientId }).catch((e) => {
        ui.showMessage('RPC Error', e.message || 'Failed to login');
        console.error(e);
    });
}

main().catch((e) => {
    console.error(e);
});