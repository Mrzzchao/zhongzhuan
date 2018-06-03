const func = require('../sql/func')

// 数据库执行器
function DBHandler (sql, arr) {
    return new Promise((resolve, reject) => {
        func.connPool(sql, arr, (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    }).catch((err) => {
        console.log('数据库操作失败：', err)
    });
}



// 查询全部
SQL.prototype.queryAll = function (pageNo = 1, pageSize = 10) {

    let startLimit, endLimit, sql;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;


    sql = `SELECT * FROM ${this.table} LIMIT ?, ?`
    arr = [startLimit , endLimit];
    return DBHandler(sql, arr)
}

// 根据id查询
SQL.prototype.queryById = function (id) {
    let sql, arr
    sql = `select * from ${this.table} where id = ?`
    arr = [id];
    return DBHandler(sql, arr)
}

// 根据指定类型查询
SQL.prototype.queryByType = function (type, val) {
    let sql, arr
    sql = `select * from ${this.table} ${type} = ?`
    arr = [val];
    return DBHandler(sql, arr)
}

// 插入单项
SQL.prototype.insert = function (obj) {
    let sql, arr
    const keys = Object.keys(obj)
    const proStr = keys.join(',')
    const backStr = keys.map(() => {
        return '?'
    }).join(',')

    sql = `INSERT INTO ${this.table}(${proStr}) VALUES(${backStr})`;
    arr = [...Object.values(obj)]

    return DBHandler(sql, arr)
}

// 删除单项
SQL.prototype.deleteOne = function (id) {
    let sql, arr
    sql = `DELETE FROM ${this.table} WHERE id = ?`
    arr = [id];
    return DBHandler(sql, arr)
}

// 删除多项
SQL.prototype.deleteMulti = function (id) {
    let sql, arr
    sql = `DELETE FROM ${this.table} WHERE id in ?`
    arr = [[id]];
    return DBHandler(sql, arr)
}

// 根据id更新单项
SQL.prototype.update = function (obj) {
    let sql, arr
    const keys = Object.keys(obj)

    const proStr = keys.map((key) => {
        return `${key}=?`
    }).join(',')

    sql = `UPDATE ${this.table} SET ${proStr} WHERE id = ?`
    arr = [...Object.values(obj), obj.id]

    return DBHandler(sql, arr)
}

function SQL(table) {
    this.table = table
}

module.exports = {
    SQL,
    DBHandler
}
