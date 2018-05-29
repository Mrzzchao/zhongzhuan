let mysql = require('mysql');
let db = require('../configs/db');
let pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            console.log('连接开始');
            try {
                let q = conn.query(sql, val, (err, rows) => {

                    if (err) {
                        console.log(err);
                    }
                    cb(err, rows);

                    console.log('连接结束');
                    conn.release();
                });

            } catch (e) {
                console.log('数据库操作错误:', e)
            }
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        let obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};
