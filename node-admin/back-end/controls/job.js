let moment = require('moment');     // 数据处理
let func = require('../sql/func');
const table = require('../configs/table');

let {SQL} = require('../sql/sql')

let SQLHandler = new SQL(table.JOB_OFFERS)

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        let obj = {};

        return Object.assign({}, row, {
            create_time: date
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

    fetchByName(req, res) {
        const job_name = req.body.job_name
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10

        SQLHandler.queryByType('title', title, pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countByType('title', job_name).then((columns) => {
                res.json({
                    code: 100,
                    msg: 'success',
                    data: rows,
                    count: columns[0].COUNT
                })
            })
        })
    },

    // 添加工作
    addOne(req, res) {
        let {job_name, company, tags, salary, company_logo, job_detail, remarks, operator, hr_email} = req.body
        let obj = {job_name, company, tags, salary, company_logo, job_detail, remarks, operator, hr_email}
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

    // 删除工作
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



     // 修改工作
    updateOne(req, res) {
        let {job_name, company, tags, salary, company_logo, job_detail, remarks, operator, hr_email, id} = req.body
        let obj = {job_name, company, tags, salary, company_logo, job_detail, remarks, operator, hr_email, id}
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
