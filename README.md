# RiiTagRPC-JS

RiiTagRPC-JS is a modern JavaScript implementation of the well-known open source project [RiiTag-RPC](https://github.com/t0g3pii/RiiTag-RPC), originally developed in Python. This tool allows you to dynamically update your Discord status (Discord Rich Presence) based on the games you are playing on Nintendo Wii/Wii U, providing seamless integration between your console and Discord community.

## Features

- **Discord Rich Presence Integration:** Display the game you’re currently playing in real-time on your Discord profile, showing details like game title, playtime, and more.
- **Cross-Platform Compatibility:** Runs on Windows, macOS, and Linux via Node.js.
- **Automatic Wii/Wii U Game Detection:** Monitors games launched through USB Loader and other homebrew solutions.
- **Easy Configuration:** Simple to install and customize via config files.
- **Modular and Extensible:** Designed for easy integration with other projects or adding new features through plugins.
- **Dynamic Updates:** Updates Discord status in real-time without needing to restart or reconnect the client.
- **RiiTag Integration:** Requires one-time authorization of the app "Riiconnect24" via Discord OAuth2 to access basic account information.

## Getting Started

Get the installer from the [latest release page](https://github.com/Just1diaxx/RiiTagRPC-JS/releases/latest), run it, authorize the app "Riiconnect24" on the Discord OAuth2 page, and... **DONE! 🤓**

## If you have a different OS than Windows

I know not everyone has Windows, so here's a short guide on how to build the executable for your own OS.

1) **Download node.js (at least v18):** https://nodejs.org/en/download
2) **Clone this repository:** https://github.com/Just1diaxx/RiiTagRPC-JS/archive/refs/heads/main.zip
3) **Open a cmd and run:**

- `npm i`
- `npm i -g pkg`
4) **Run one of these commands depending on your OS:**

**Windows**

```
npx pkg . --targets node18-win-x64
```
**Linux**

```
npx pkg . --targets node18-linux-x64
```
**MacOS x64 (non-Arm)**
```
npx pkg . --targets node18-macos-x64
```
**MacOS Arm64**
```
npx pkg . --targets node18-macos-arm64
```

**After doing this, you'll have a portable executable built specifically for your operating system!**

---

Feel free to contribute or open issues if you find any bugs or want new features!
