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

    let startLimit, endLimit, sql, arr;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;

    sql = `SELECT * FROM ${this.table} LIMIT ?, ?`
    arr = [startLimit , endLimit];
    return DBHandler(sql, arr)
}

// 根据id查询
SQL.prototype.queryById = function (id, pageNo = 1, pageSize = 10) {
    let startLimit, endLimit, sql, arr;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;

    sql = `select * from ${this.table} where id = ? limit ?, ?`
    arr = [id, startLimit , endLimit];
    return DBHandler(sql, arr)
}

// 根据学生id查询
SQL.prototype.queryByStudentId = function (student_id) {
    let sql, arr
    sql = `select * from ${this.table} where student_id = ?`
    arr = [student_id];
    return DBHandler(sql, arr)
}

// 根据学生id查询技能证书，需要group by
SQL.prototype.querySkillByStudentIdGroupBySkillid = function (student_id) {
    let sql, arr
    sql = `select * from t_skill_certification where student_id = ?`;
    arr = [student_id];
    return DBHandler(sql, arr)
}


// 根据id字符串查询
SQL.prototype.queryByIds = function (id, pageNo = 1, pageSize = 10) {
    let startLimit, endLimit, sql, arr;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;

    sql = `select * from ${this.table} where id in ? limit ?, ?`
    arr = [[id.split(',')], startLimit , endLimit];
    return DBHandler(sql, arr)
}

// 根据指定类型查询
SQL.prototype.queryByType = function (type, val, pageNo = 1, pageSize = 10) {
    let startLimit, endLimit, sql, arr;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;

    sql = `select * from ${this.table} where ${type} = ? limit ?, ?`
    arr = [val, startLimit , endLimit];
    return DBHandler(sql, arr)
}

// 根据多个类型查询
SQL.prototype.queryByTypes = function (obj, pageNo = 1, pageSize = 10) {
    let startLimit, endLimit, sql, arr;
    endLimit = pageNo * pageSize;
    startLimit = endLimit - pageSize;

    const keys = Object.keys(obj)
    const backStr = keys.map((key) => {
        return `${key} = ?`
    }).join(' and ')

    sql = `select * from ${this.table} where ${backStr} limit ?, ?`
    arr = [...Object.values(obj), startLimit , endLimit];
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

// 查询总条目数目
SQL.prototype.countAll = function () {
    let sql, arr = [];

    sql = `SELECT COUNT(*) AS COUNT FROM ${this.table}`
    return DBHandler(sql, arr)
}

// 查询单类型条目数目
SQL.prototype.countByType = function (type, val) {
    let sql, arr = [];

    sql = `SELECT COUNT(*) AS COUNT FROM ${this.table} WHERE ${type} = ?`
    arr = [val]

    return DBHandler(sql, arr)
}

// 查询单类型条目数目
SQL.prototype.countByTypes = function (obj) {
    let sql, arr = [];

    const keys = Object.keys(obj)
    const backStr = keys.map((key) => {
        return `${key} = ?`
    }).join(' and ')

    sql = `SELECT COUNT(*) AS COUNT FROM ${this.table} WHERE ${backStr}`
    arr = [...Object.values(obj)];
    return DBHandler(sql, arr)
}

function SQL(table) {
    this.table = table
}

module.exports = {
    SQL,
    DBHandler
}
