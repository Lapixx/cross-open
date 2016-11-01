const exec = require("child_process").exec;
const path = require("path");

// Returns either `open` or `start` depending on the current platform
const getCmd = () => {

    const platform = process.platform;

    if (platform === "darwin") return "open";
    if (platform === "win32") return "start";
};

// Creates the `open` function
const makeOpen = opener => target => exec(`${opener} "${target}"`);

// Escapes a command line argument
const escape = arg => arg.replace(/"/g, '\\\"');

// Entry point of cross-open
const crossOpen = targets => {

    const cmd = getCmd();
    const open = makeOpen(cmd);

    targets.map(escape).forEach(open);
}

module.exports = crossOpen;
