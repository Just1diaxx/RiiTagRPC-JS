const fs = require('fs');
const { getCache } = require('./util');

class Preferences {
  constructor(data = {}) {
    this.data = data;
  }

  get(key, defaultValue = null) {
    return this.data[key] ?? defaultValue;
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  save() {
    fs.writeFileSync(getCache('prefs.json'), JSON.stringify(this.data, null, 2));
  }

  static load(path = getCache('prefs.json')) {
    try {
      const raw = fs.readFileSync(path, 'utf8');
      return new Preferences(JSON.parse(raw));
    } catch {
      return new Preferences();
    }
  }
}

module.exports = { Preferences };