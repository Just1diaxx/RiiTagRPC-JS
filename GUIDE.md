# RiiTag Guide

**RiiTag** is a customizable and dynamic gamertag. By sharing your gamertag (a dynamic image), you can showcase your gaming activity to others. A Discord account is required to use RiiTag.

## Requirements
- A computer
- A text editor
- [A Discord account](https://discord.com/login)

## Getting Started

1. Visit [t0g3pii's RiiTag website](https://riitag.t0g3pii.de/).
2. Click the **Login** button in the top-right corner and sign in with your Discord account.
3. Authorize the `RiiTag` application when prompted.

> ![Warning icon](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/OOjs_UI_icon_information-warning.svg/20px-OOjs_UI_icon_information-warning.svg.png) ***Warning: Do not share your RiiTag key with anyone!** Sharing your key may allow others to misuse your tag.*

To customize your RiiTag:
1. Click your profile in the top-right corner of the website.
2. Select **Edit RiiTag**.

## Connecting your USB Loader

### USB Loader GX

1. Launch USB Loader GX from your homebrew list.
2. Navigate to **Settings > Features** and enable **Wiinnertag**. Confirm any prompts.
3. Ensure **Initialize Network** is enabled.
4. Close USB Loader GX.
5. Insert the storage device containing USB Loader GX into your computer.
6. Download the `Wiinnertag.xml` file from your [RiiTag account page](https://riitag.t0g3pii.de/account).
7. Copy the downloaded `Wiinnertag.xml` to `/apps/usbloader_gx` on your storage device.

> ![Success icon](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/OOjs_UI_icon_information-constructive.svg/20px-OOjs_UI_icon_information-constructive.svg.png) ***Setup complete!** Launch a game to verify RiiTag functionality.*

### WiiFlow

1. Insert the storage device containing WiiFlow into your computer.
2. Open `/apps/wiiflow/wiiflow.ini` in a text editor.
3. Copy your RiiTag key from [here](https://riitag.t0g3pii.de/account).
4. Modify the file:
    - Search for `gamercards_enable` and replace it with `gamercards_enable=yes`.
    - Search for `gamercards` and replace it with `gamercards=wiinnertag`.
    - Search for `wiinnertag_url` and replace it with `wiinnertag_url=https://riitag.t0g3pii.de/wii?game={ID6}&key={KEY}`.
    - Search for `wiinnertag_key` and replace it with `wiinnertag_key=<key>`, replacing `<key>` with your RiiTag key.
5. Save the modified `wiiflow.ini`.

> ![Success icon](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/OOjs_UI_icon_information-constructive.svg/20px-OOjs_UI_icon_information-constructive.svg.png) ***Setup complete!** Launch a game to verify RiiTag functionality.*

### Configurable USB Loader

> ![Warning icon](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/OOjs_UI_icon_information-warning.svg/20px-OOjs_UI_icon_information-warning.svg.png) ***Warning:** Configurable USB Loader is **outdated** and may have **limited support** compared to USB Loader GX and WiiFlow.*

> ![Info icon](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/OOjs_UI_icon_information-progressive.svg/20px-OOjs_UI_icon_information-progressive.svg.png) *You can use the `CfgLoaderConfigurator.exe` program (Windows only) instead of manually editing the `config.txt` file.*

1. Insert the storage device containing Configurable USB Loader into your computer.
2. Open `/usb-loader/config.txt` in a text editor.
3. Copy your RiiTag key from [here](https://riitag.t0g3pii.de/account).
4. Modify the file:
    - Search for `gamercard_url` and replace it with `gamercard_url = http://riitag.t0g3pii.de/wii?game={ID6}&key={KEY}`.
    - Search for `gamercard_key` and replace it with `gamercard_key = <key>`, replacing `<key>` with your RiiTag key.
5. Save the modified `config.txt`.

> ![Success icon](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/OOjs_UI_icon_information-constructive.svg/20px-OOjs_UI_icon_information-constructive.svg.png) ***Setup complete!** Launch a game to verify RiiTag functionality.*

## RiiTag RPC

> ![Info icon](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/OOjs_UI_icon_information-progressive.svg/20px-OOjs_UI_icon_information-progressive.svg.png) *This program displays your current game on your Discord profile alongside your RiiTag.*

### Requirements
- [RiiTag RPC](https://github.com/t0g3pii/RiiTag-RPC/releases/latest)

### Instructions

1. Run the downloaded executable for your system.
2. Once loaded, press **Enter** to show the login prompt.
3. A dialog will appear asking if you want to authorize `RiiConnect24 Login`. Click **Authorize**.

> ![Success icon](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/OOjs_UI_icon_information-constructive.svg/20px-OOjs_UI_icon_information-constructive.svg.png) ***Setup complete!** Launch a game to verify RiiTag RPC functionality.*

## UTag

> ![Info icon](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/OOjs_UI_icon_information-progressive.svg/20px-OOjs_UI_icon_information-progressive.svg.png) *This requires a [modded Wii U](https://wiiu.hacks.guide/) running the [Aroma environment](https://wiiu.hacks.guide/aroma/getting-started).*

### Requirements
- [UTag](https://github.com/t0g3pii/UTag/releases/latest)
- [Notepad++](https://notepad-plus-plus.org/downloads/)

### Instructions

1. Insert your SD card into your computer.
2. Open the downloaded ZIP archive and copy `utag.wps` to `wiiu/environments/aroma/plugins/`.
3. Visit [t0g3pii's RiiTag website](https://riitag.t0g3pii.de/).
4. Login if you're not already logged in.
5. Copy your RiiTag key from [here](https://riitag.t0g3pii.de/account).

> ![Warning icon](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/OOjs_UI_icon_information-warning.svg/20px-OOjs_UI_icon_information-warning.svg.png) ***Warning: Do not share your RiiTag key with anyone!** Sharing your key may allow others to misuse your tag.*

6. Create a text document named `utag.txt` in the `wiiu` folder on the root of your SD card.
7. Open `utag.txt` in Notepad++ and paste your RiiTag key into the file.
8. Save the file.

> ![Success icon](https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/OOjs_UI_icon_information-constructive.svg/20px-OOjs_UI_icon_information-constructive.svg.png) ***Setup complete!** Launch a game to verify RiiTag functionality on your Wii U.*
