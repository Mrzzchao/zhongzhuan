const moment = require('moment');     // 数据处理
const MD5 = require('../utils/md5')
const table = require('../configs/table');

let {SQL} = require('../sql/sql')

let SQLHandler = new SQL(table.STUDENT)

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        let obj = {};
        let classStr = row.grade + ' ' + row.major + ' ' + row.className
        return Object.assign({}, row, {
            create_time: date,
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
            res.json({
                code: 100,
                msg: 'success',
                data: rows
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
            res.json({
                code: 100,
                msg: 'success',
                data: rows
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
