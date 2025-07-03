class RiitagTitleResolver {
  static WII_TITLES_URL = 'https://www.gametdb.com/wiitdb.txt?LANG=EN';
  static WIIU_TITLES_URL = 'https://www.gametdb.com/wiiutdb.txt?LANG=EN';
  static UPDATE_EVERY_MS = 24 * 60 * 60 * 1000;

  constructor() {
    this.gameIds = new Map();
    this._lastUpdate = 0;
  }

  async updateMaybe() {
    const now = Date.now();
    if (now - this._lastUpdate >= RiitagTitleResolver.UPDATE_EVERY_MS) {
      await this.update();
      return true;
    }
    return false;
  }

  async update() {
    const wiiDb = await this._getData(RiitagTitleResolver.WII_TITLES_URL);
    for (const [gameId, name] of Object.entries(wiiDb)) {
      this.gameIds.set(`wii:${gameId.toUpperCase()}`, name);
    }

    const wiiuDb = await this._getData(RiitagTitleResolver.WIIU_TITLES_URL);
    for (const [gameId, name] of Object.entries(wiiuDb)) {
      this.gameIds.set(`wiiu:${gameId.toUpperCase()}`, name);
    }

    this._lastUpdate = Date.now();
  }

  getGameName(consoleName, gameId) {
    const key = `${consoleName.toLowerCase()}:${gameId.toUpperCase()}`;
    return this.gameIds.get(key) || 'Unknown';
  }

  async resolve(consoleName, gameId) {
    await this.updateMaybe();
    return this.getGameName(consoleName, gameId);
  }

  async _getData(url) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'RiiTagRPC-JS/1.0' }
      });
      if (!res.ok) return {};

      const text = await res.text();
      return this._parseDb(text);
    } catch {
      return {};
    }
  }

  _parseDb(dbText) {
    const res = {};
    const lines = dbText.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('TITLES')) continue;

      const parts = trimmed.split(' = ');
      if (parts.length !== 2) continue;

      const [gameId, title] = parts;
      res[gameId.trim()] = title.trim();
    }
    return res;
  }
}

module.exports = { RiitagTitleResolver };
