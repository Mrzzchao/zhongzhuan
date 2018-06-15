let moment = require('moment');     // 数据处理
let bcrypt = require('bcryptjs');   // 加密数据
let func = require('../sql/func');
let md5 = require('../utils/md5');
const table = require('../configs/table');
let salt = '$%^&%^644r63SDFGYHGFSfamk;lbk;';

let {SQL} = require('../sql/sql')

let SQLHandler = new SQL(table.USER)

function formatData(rows) {
	return rows.map(row => {
        let dateC = moment(row.create_time || Date.now()).format('YYYY-MM-DD');
        let dateU = moment(row.update_time || Date.now()).format('YYYY-MM-DD');
		let obj = {};

		switch (row.role) {
			case 1:
				obj.role = '普通用户';
				break;
			case 10:
				obj.role = '管理员';
				break;
			case 100:
				obj.role = '超级管理员';
		}

		delete row.password;   // 不返回密码给用户

		return Object.assign({}, row, {
            create_time: dateC,
            update_time: dateU
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
        const username = req.body.username
        const pageNo = req.body.pageNo || 1
        const pageSize = req.body.pageSize || 10

        SQLHandler.queryByType('username', username, pageNo, pageSize).then((rows) => {
            rows = formatData(rows)
            SQLHandler.countByType('username', username).then((columns) => {
                res.json({
                    code: 100,
                    msg: 'success',
                    data: rows,
                    count: columns[0].COUNT
                })
            })
        })
    },

	// 添加用户
	addOne(req, res) {
		let username = req.body.username;
		let password = req.body.password;
		let role = req.body.role;
		console.log("role", role);
		password = md5.md5Encrypt(password + salt);

		let obj = {username, password, role}
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

	// 删除用户
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

    updateOne(req, res) {
        let {id, username, password, role, remark, create_time, login_time} = req.body
		password = md5.md5Encrypt(password + salt);
        let obj = {id, username, password, role, remark, create_time, login_time}
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

	// 登录
	login(req, res) {
		let username = req.body.username;
		let password = req.body.password;

		SQLHandler.queryByType('username', username).then((rows) => {
			if (!rows.length) {
				res.json({
					code: 400,
					msg: '用户名不存在'
				});
				return;
			}


			const passwordConfirm = rows[0].password;
			password = md5.md5Encrypt(password + salt);
			console.log(password)
			if(password === passwordConfirm) {  // 密码匹配成功
				let user = {
					id: rows[0].id,
					username: rows[0].username,
					role: rows[0].role,
					remark: rows[0].remark
				}

				req.session.login = user;
				res.json({
					code: 100,
					msg: '登录成功',
					data: user
				});
			} else {
				res.json({
					code: 202,
					msg: '密码错误'
				})
			}
		})
	},

	// 自动登录
	autoLogin(req, res) {
		let user = req.session.login;
		if (user) {
			res.json({
				code: 100,
				msg: '自动登录',
				data: user
			});

		} else {
			res.json({
				code: 400,
				msg: 'not found'
			});
		}
	},

	// 注销
	logout(req, res) {
		req.session.login = null;
		res.json({
			code: 200,
			msg: '注销'
		});
	},

	// 权限控制
	controlVisit(req, res, next) {
		// if (req.session.login.role && req.session.login.role < 10) {
		// 	res.json({
		// 		code: 400,
		// 		msg: '权限不够'
		// 	});
		// 	return;
		// }

		next();
	},

	// 权限变更
	changeRole(req, res) {
		// let role = req.session.login.role;
		let role = 100;
		let change_role = req.body.role;

		if (role !== 100 && change_role === 100) {
			res.json({
				code: 400,
				msg: '权限不够'
			});
			return;
		}
		let id = req.body.id;
		SQLHandler.update({id, role: change_role}).then((rows) => {
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
