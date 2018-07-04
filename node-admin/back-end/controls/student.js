const moment = require('moment');     // 数据处理
const MD5 = require('../utils/md5')
const table = require('../configs/table');

let {SQL} = require('../sql/sql')

let SQLHandler = new SQL(table.STUDENT)

let SQLHandlerWork = new SQL(table.WORK_EXPERIENCE)

function getQueryParams(obj) {
    let result = {}
    Object.keys(obj).forEach((key) => {
        obj[key] && (result[key] = obj[key])
    })

    return result
}

function formatData(rows) {
    return rows.map(row => {
        let dateC = moment(row.create_time || Date.now()).format('YYYY-MM-DD');
        let dateU = moment(row.update_time || Date.now()).format('YYYY-MM-DD');
        let obj = {};
        let classStr = row.grade + ' ' + row.major + ' ' + row.className
        return Object.assign({}, row, {
            create_time: dateC,
            update_time: dateU,
            classStr
        }, obj);
    });
}


module.exports = {
    fetchAll(req, res) {
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10
        SQLHandler.queryAll(pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countAll().then((columns) => {
                res.json({
                    code: 100,
                    msg: 'success',
                    data: rows,
                    count: columns[0].COUNT
                })
            })
        })
    },

    fetchById(req, res) {
        const id = req.body.id
        SQLHandler.queryById(id).then((rows) => {
            rows = formatData(rows)
            res.json({
                code: 100,
                msg: 'success',
                data: rows[0]
            })
        })
    },

    fetchByWxId(req, res) {
        const wx_openid = req.body.wx_openid
        SQLHandler.queryByType('wx_openid', wx_openid).then((rows) => {
            rows = formatData(rows)
            res.json({
                code: 100,
                msg: 'success',
                data: rows[0] || {}
            })
        })
    },

    fetchByName(req, res) {
        const real_name = req.body.real_name
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10

        SQLHandler.queryByType('real_name', real_name, pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countByType('real_name', real_name).then((columns) => {
                res.json({
                    code: 100,
                    msg: 'success',
                    data: rows,
                    count: columns[0].COUNT
                })
            })
        })
    },

    fetchByTypes(req, res) {
        let typeObj = getQueryParams(req.body)
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10



        delete typeObj.pageNo
        delete typeObj.pageSize



        SQLHandler.queryByTypes(typeObj, pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countByTypes(typeObj).then((columns) => {
                res.json({
                    code: 100,
                    msg: 'success',
                    data: rows,
                    count: columns[0].COUNT
                })
            })
        })
    },

    fetchAllWithWork(req, res) {
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10
        SQLHandler.queryAll(pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countAll().then((columns) => {
                const promiseArr = rows.map((row) => {
                    return SQLHandlerWork.queryByType('student_id', row.student_id).then((rowsW) => {
                        const work = rowsW[rowsW.length - 1]
                        if(work) {
                            console.log(rowsW)
                            row.company_name = work.company_name
                            row.title = work.title
                            row.service_time = work.service_time
                        } else {
                            row.company_name = ''
                            row.title = ''
                            row.service_time = ''
                        }
                        return row
                    })
                })
                Promise.all(promiseArr).then((result) => {
                    res.json({
                        code: 100,
                        msg: 'success',
                        data: result,
                        count: columns[0].COUNT
                    })
                })
            })
        })
    },

    fetchByTypesWithWork(req, res) {
        let typeObj = getQueryParams(req.body)
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10



        delete typeObj.pageNo
        delete typeObj.pageSize

        SQLHandler.queryByTypes(typeObj, pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countByTypes(typeObj).then((columns) => {
                const promiseArr = rows.map((row) => {
                    return SQLHandlerWork.queryByType('student_id', row.student_id).then((rowsW) => {
                        const work = rowsW[rowsW.length - 1]
                        if(rowsW.length) {
                            row.company_name = work.company_name || ''
                            row.title = work.title || ''
                            row.service_time = work.service_time || ''
                        } else {
                            row.company_name = ''
                            row.title = ''
                            row.service_time = ''
                        }
                        return row
                    })
                })
                Promise.all(promiseArr).then((result) => {
                    res.json({
                        code: 100,
                        msg: 'success',
                        data: result,
                        count: columns[0].COUNT
                    })
                })
            })
        })
    },


    // 添加学生信息
    addOne(req, res) {
        let {wx_openid, wx_img, real_name, sexuality, classStr, born_date, highest_education, mobile, email} = req.body
        let [grade, major, className] = classStr.split(' ')
        let student_id = MD5.createMd5Hash(wx_openid)

        let obj = {wx_openid, wx_img, real_name, sexuality, grade, major, className, born_date, highest_education, mobile, email, student_id}
        SQLHandler.insert(obj).then((rows) => {
            if(rows.affectedRows) {
                res.json({
                    code: 100,
                    msg: 'success'
                })
            } else {
                res.json({
                    code: 102,
                    msg: 'fail'
                })
            }
        })
    },

    // 删除学生信息
    deleteOne(req, res) {
        const id = req.body.id;

        SQLHandler.deleteOne(id).then((rows) => {
            if(rows.affectedRows) {
                res.json({
                    code: 100,
                    msg: 'success'
                })
            } else {
                res.json({
                    code: 102,
                    msg: 'fail'
                })
            }
        })
    },

    // 批量删除
    deleteMulti(req, res) {
        const id = req.body.id;

        SQLHandler.deleteMulti(id).then((rows) => {
            if(rows.affectedRows) {
                res.json({
                    code: 100,
                    msg: 'success'
                })
            } else {
                res.json({
                    code: 102,
                    msg: 'fail'
                })
            }
        })
    },



     // 修改学生信息
    updateOne(req, res) {
        let {wx_openid, wx_img, real_name, sexuality, classStr, born_date, highest_education, mobile, email, student_id, id} = req.body
        let [grade, major, className] = classStr.split(' ')
        let obj = {wx_openid, wx_img, real_name, sexuality, grade, major, className, born_date, highest_education, mobile, email, student_id, id}
        SQLHandler.update(obj).then((rows) => {
            if(rows.affectedRows) {
                res.json({
                    code: 100,
                    msg: 'success'
                })
            } else {
                res.json({
                    code: 102,
                    msg: 'fail'
                })
            }
        })
    },

};
