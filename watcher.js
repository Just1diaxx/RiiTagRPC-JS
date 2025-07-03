class RiitagWatcher {
  constructor(preferences, user, updateCallback, messageCallback) {
    this.preferences = preferences;
    this.user = user;
    this.updateCallback = updateCallback;
    this.messageCallback = messageCallback;

    this.run = false;
    this.lastCheck = new Date(2000, 0, 1);
    this.noRiitagWarningShown = false;
    this.lastRiitag = null;

    this.intervalId = null;
  }

  async getRiitag() {
    try {
      return await this.user.fetchRiitag();
    } catch (err) {
      if (!this.noRiitagWarningShown) {
        this.messageCallback(
          'RiiTag not found',
          "We couldn't find your RiiTag.\n\nTo create one, please visit https://riitag.t0g3pii.de/"
        );
        this.noRiitagWarningShown = true;
      }
      return null;
    }
  }

  start() {
    if (this.run) return;
    this.run = true;
    this.loop();
    this.intervalId = setInterval(() => this.loop(), this.preferences.checkInterval * 1000);
  }

  stop() {
    this.run = false;
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async loop() {
    if (!this.run) return;
    const now = new Date();

    if (now - this.lastCheck >= this.preferences.checkInterval * 1000) {
      this.lastCheck = now;

      const newRiitag = await this.getRiitag();
      if (!newRiitag) return;

      if (this.lastRiitag) {
        const lastPlayTime = this.lastRiitag.lastPlayed?.time;
        if (
          !lastPlayTime ||
          (now - new Date(lastPlayTime)) >= this.preferences.presenceTimeout * 60000
        ) {
          newRiitag.outdated = true;
        }
      }

      if (JSON.stringify(newRiitag) !== JSON.stringify(this.lastRiitag)) {
        try {
          await this.updateCallback(newRiitag);
          this.lastRiitag = newRiitag;
        } catch (err) {
          console.error('[RiitagWatcher] Failed to update presence:', err);
        }
      }
    }
  }
}

module.exports = { RiitagWatcher };
