const http = require('http');
const url = require('url');
const open = require('open');

const API_ENDPOINT = 'https://discord.com/api';
const AUTHORIZE_ENDPOINT = `${API_ENDPOINT}/oauth2/authorize`;
const TOKEN_ENDPOINT = `${API_ENDPOINT}/oauth2/token`;

class OAuth2Token {
  constructor(client, data) {
    this.client = client;
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.token_type = data.token_type;
    this.expires_in = data.expires_in;
    this.scope = data.scope;
    this.last_refresh = Date.now() / 1000;
  }

  loadToken(tokenData) {
    return new OAuth2Token(this, tokenData);
  }

  async getUser() {
    if (this.needs_refresh) {
      await this.refresh();
    }

    const res = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${this.access_token}` }
    });

    if (!res.ok) throw new Error(`Failed to get user: ${res.status}`);

    return await res.json();
  }

  get needs_refresh() {
    return (Date.now() / 1000) - this.last_refresh > this.expires_in;
  }

  async refresh() {
    const payload = new URLSearchParams({
      client_id: this.client.config.client_id,
      client_secret: this.client.config.client_secret,
      grant_type: 'refresh_token',
      refresh_token: this.refresh_token,
      redirect_uri: this.client.redirect_uri,
      scope: this.scope
    });

    const res = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    });

    const json = await res.json();
    Object.assign(this, json);
    this.last_refresh = Date.now() / 1000;
  }

  async get_user() {
    if (this.needs_refresh) await this.refresh();

    const res = await fetch(`${API_ENDPOINT}/users/@me`, {
      headers: { Authorization: `Bearer ${this.access_token}` }
    });

    return res.json();
  }
}

class OAuth2Client {
  constructor(config) {
    this.config = config;
    this._server = null;
    this._code = null;
  }

  get redirect_uri() {
    return `http://localhost:${this.config.port}/callback`;
  }

  get auth_url() {
    const params = new URLSearchParams({
      client_id: this.config.client_id,
      redirect_uri: this.redirect_uri,
      response_type: 'code',
      scope: 'identify'
    });
    return `${AUTHORIZE_ENDPOINT}?${params.toString()}`;
  }

  startServer() {
    if (this._server) return;

    this._server = http.createServer((req, res) => {
      const parsed = url.parse(req.url, true);

      if (parsed.pathname !== '/callback') {
        res.writeHead(404);
        res.end('Not found.');
        return;
      }

      this._code = parsed.query.code;
      res.writeHead(200);
      res.end('Login completed! You may now close this window... Obviously, you can also leave it open.');
    });

    this._server.listen(this.config.port, () => {
      console.log(`[OAuth2] Listening on port ${this.config.port}`);
      open(this.auth_url);
    });
  }

  async waitForCode() {
    while (!this._code) await new Promise(r => setTimeout(r, 100));
    return this._code;
  }

  async getToken(code) {
    const payload = new URLSearchParams({
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirect_uri,
      scope: 'identify'
    });

    const res = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    });

    const json = await res.json();
    return new OAuth2Token(this, json);
  }
}

module.exports = { OAuth2Client, OAuth2Token };
