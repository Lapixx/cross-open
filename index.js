const exec = require("child_process").exec;
const path = require("path");

// Returns either `open` or `start` depending on the current platform
const getCmd = () => {

    const platform = process.platform;

    if (platform === "darwin") return "open";
    if (platform === "win32") return "start";
		if (platform === "linux") return "xdg-open";
		if (platform === "freebsd") return "xdg-open";
		if (platform === "openbsd") return "xdg-open";
};

const handleExec = (err, stdout, stderr) => {
    if (err) {
        console.error(err.message || err);
        process.exit(1);
    }
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
}

// Creates the `open` function
const makeOpen = opener => target => exec(`${opener} "${target}"`, handleExec);

// Escapes a command line argument
const escape = arg => arg.replace(/"/g, '\\\"');

// Entry point of cross-open
const crossOpen = targets => {

    const cmd = getCmd();
    const open = makeOpen(cmd);

    targets.map(escape).forEach(open);
}

module.exports = crossOpen;
