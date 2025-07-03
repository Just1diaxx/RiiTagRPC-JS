const RIITAG_ENDPOINT = 'https://riitag.t0g3pii.de/{}/json';

class RiitagNotFoundError extends Error {}

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.avatar = data.avatar;
    this.riitag = null;
  }

  async fetchRiitag() {
    const url = RIITAG_ENDPOINT.replace('{}', this.id);

    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'RiiTagRPC-JS/1.0' } });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new RiitagNotFoundError(data.error);
      }

      this.riitag = data;
      return this.riitag;
    } catch (error) {
      this.riitag = null;
      throw error;
    }
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }
}

module.exports = { User, RiitagNotFoundError };

