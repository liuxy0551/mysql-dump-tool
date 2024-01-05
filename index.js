/**
 * https://github.com/bradzacher/mysqldump
 */
const mysqldump = require('mysqldump');
const { targetPath, mvOrCp, extraCommand, list } = require('./database.config');
const { getTimeStr, rmFolder, runCommand, getDurationStr } = require('./utils');

if (!list.length) return;

let count = 0;
const timeStr = getTimeStr(true);
const loop = async (config) => {
    try {
        const start = new Date().getTime();
        await mysqldump({
            connection: config,
            dumpToFile: `./${timeStr}/${config.database}.sql`,
            dump: {
                data: {
                    format: false,
                },
                schema: {
                    table: {
                        dropIfExist: true, // 删除表重新导入，否则 insert 会有主键重复的问题
                    },
                },
            },
        });
        count++;
        console.log(
            `[${count}/${list.length}] ${config.database} completed, duration: ${getDurationStr(
                start
            )}`
        );

        if (count < list.length) {
            loop(list[count]);
        } else {
            console.log(`\nDONE! All database dump completed. \n`);

            const lsCommand = `ls -lhS ${timeStr}`;
            console.log(`preview result: ${lsCommand}`);
            runCommand(lsCommand);

            if (targetPath) {
                // copy or move result folder to targetPath when dump completed, support MacOS
                const backupCommand =
                    mvOrCp === 'cp'
                        ? `cp -r ${timeStr} ${targetPath}`
                        : `mv ${timeStr} ${targetPath}`;

                console.log(`\n${backupCommand}\n${extraCommand}`);
                runCommand(backupCommand);
                runCommand(extraCommand);
            }
        }
    } catch (error) {
        console.log('mysql dump error', count, config.database, error);
        count === 0 && rmFolder(timeStr);
    }
};

console.log('mysql dump tool start working... \n');
loop(list[0]);
