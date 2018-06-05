let moment = require('moment');     // 数据处理
const table = require('../configs/table');
let {SQL} = require('../sql/sql')

const domain = 'http://193.112.122.181:9999'

let SQLHandler = new SQL(table.SKILL_CERTIFICATION)

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
            res.json({
                code: 100,
                msg: 'success',
                data: rows
            })
        })
    },

    // 添加技能认证
    addOne(req, res) {
        let {obtained_time, remarks, id} = req.body
        let obj = {obtained_time, remarks, id}
        obj.img_url = `${domain}/${req.file.destination}/${req.file.filename}`
        SQLHandler.queryById(id).then((rows) => {
            if(rows.length) {
                updateOne(req, res)
            } else {
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
            }
        })
    },

    // 删除技能认证
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



     // 修改技能认证
    updateOne(req, res) {
        let obj = {obtained_time, remarks, id} = req.body
        obj.img_url = `${domain}/${req.file.destination}/${req.file.filename}`
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
    }

};
