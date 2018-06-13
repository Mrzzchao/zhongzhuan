let moment = require('moment');     // 数据处理
let func = require('../sql/func');
const table = require('../configs/table');

let {SQL} = require('../sql/sql')

let SQLHandler = new SQL(table.EDUCATION_EXPERIENCE)

function formatData(rows) {
    function formatData(rows) {
        return rows.map(row => {
            let dateC = moment(row.create_time || Date.now()).format('YYYY-MM-DD');
            let dateU = moment(row.update_time || Date.now()).format('YYYY-MM-DD');
            let obj = {};

            return Object.assign({}, row, {
                create_time: dateC,
                update_time: dateU
            }, obj);
        });
    }
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

    fetchById(req, res) {
        const id = req.body.id
        SQLHandler.queryById(id).then((rows) => {
            rows = formatData(rows)
            res.json({
                code: 100,
                msg: 'success',
                data: rows[0] || {}
            })
        })
    },

    fetchByIds(req, res) {
        const id = req.body.id
        SQLHandler.queryByIds(id).then((rows) => {
            rows = formatData(rows)
            res.json({
                code: 100,
                msg: 'success',
                data: rows
            })
        })
    },

    fetchByStuId(req, res) {
        const student_id = req.body.student_id
        SQLHandler.queryByType('student_id', student_id).then((rows) => {
            rows = formatData(rows)
            res.json({
                code: 100,
                msg: 'success',
                data: rows
            })
        })
    },

    // 添加教育经历
    addOne(req, res) {
        let {school_name, college_major, educated_time, educational_history, student_id} = req.body
        let obj = {school_name, college_major, educated_time, educational_history, student_id}
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

    // 删除教育经历
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



     // 修改教育经历
    updateOne(req, res) {
        let {school_name, college_major, educated_time, educational_history, id, student_id} = req.body
        let obj = {school_name, college_major, educated_time, educational_history, id, student_id}
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
