const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

function getCache(filename) {
  const dir = path.join(os.homedir(), '.riitag-js');
  return filename ? path.join(dir, filename) : dir;
}

function getUserData() {
  const file = getCache('user.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

function saveUserData(data) {
  const file = getCache('user.json');
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving user data:', err);
  }
}

module.exports = { getCache, getUserData, saveUserData };
