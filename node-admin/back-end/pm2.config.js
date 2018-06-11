/**
 * Created by sampson on 2017/5/7.
 */
module.exports = {
    apps: [
        {
            name: 'zhongzhuan',
            script: './app.js',
            kill_timeout: 3000,
            instances: 3,
            exec_mode: 'cluster',
            // watch: ['dist/*.json'],
            restart_delay: '500', // time to wait before restarting a crashed app (in milliseconds). defaults to 0.,
            listen_timeout: '5000', // time in ms before forcing a reload if app not listening,
            max_memory_restart: '1280M',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            // ignore_watch: ['node_modules'],
            env: {
                NODE_ENV: 'production',
                PORT: 9999,
                HOST: '0.0.0.0',
                ADDRESS: 'www.yukisa.com'
            },
            env_release: {
                // ADDRESS: '43.247.69.20'
                ADDRESS: 'www.yukisa.com'
            },
            env_pre: {
                ADDRESS: 'www.yukisa.com'
            },
            env_dev: {
                ADDRESS: 'www.yukisa.com'
            }
        }
    ]
}
