const shell = require('shelljs');

const getTimeStr = (needMkdirFolder = false) => {
    const temp = new Date();
    const year = temp.getFullYear();
    const month = temp.getMonth() + 1;
    const day = temp.getDate();
    const hour = temp.getHours();
    const minute = temp.getMinutes();

    const time = `${year}${unshift0(month)}${unshift0(day)}${unshift0(hour)}${unshift0(minute)}`;
    needMkdirFolder && mkdirFolder(time);
    return time;
};

const unshift0 = (num) => {
    return num > 9 ? `${num}` : `0${num}`;
};

const mkdirFolder = (time) => {
    runCommand(`mkdir ${time}`);
};

const rmFolder = (time) => {
    runCommand(`rm -rf ${time}`);
};

const runCommand = (command) => {
    shell.exec(command);
};

const getDurationStr = (start) => {
    const _second = Math.round((new Date().getTime() - start) / 1000);
    const hour = Math.floor(_second / (60 * 60));
    const minute = _second >= 60 ? (_second - hour * 60 * 60) / 60 : 0;
    const second = _second % 60;
    if (hour) {
        return `${hour}h${minute}m${second}s`;
    }
    if (!hour && minute) {
        return `${minute}m${second}s`;
    }
    if (!hour && !minute) {
        return `${second}s`;
    }
};

module.exports = {
    getTimeStr,
    rmFolder,
    runCommand,
    getDurationStr,
};
