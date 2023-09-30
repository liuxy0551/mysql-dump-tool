/**
 * Backup and restore for MySQL databases
 * https://github.com/liuxy0551/mysql-dump-tool
 */
module.exports = {
    // move or move result folder to targetPath when dump completed, support MacOS
    targetPath: '',
    // move or copy sql files to targetPath, default value is 'mv'
    mvOrCp: 'mv',
    // ali drive auto backup appointed folder
    extraCommand: 'open /Applications/aDrive.app',
    list: [
        {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'mysql',
        },
        {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'performance_schema',
        },
        {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'sys',
        },
    ],
};
