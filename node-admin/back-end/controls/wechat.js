const ajax = require('../utils/ajax')
const config = require('../configs/wechat')

function getSessionKey (code, appid, secret, grant_type) {
    const params = {
        appid: appid,
        secret: secret,
        js_code: code,
        grant_type: grant_type
    }
    return ajax('https://api.weixin.qq.com/sns/jscode2session', params).then((data) => {
        console.log(data)
        if (!data.openid || !data.session_key || data.errcode) {
            return {
                result: -2,
                errmsg: data.errmsg || '返回数据字段不完整'
            }
        } else {
            return data
        }
    });
}


module.exports = {
    requestSessionKey(req, res) {
        let {appid, secret, grant_type} = config
        let code = req.body.code
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${grant_type}`

        return ajax.get(url).then((data) => {
            console.log(data)
            let result = {}
            if (!data.openid || !data.session_key || data.errcode) {
                result = {
                    result: -2,
                    errmsg: data.errmsg || '返回数据字段不完整'
                }
            } else {
                result = data
            }

            res.json(result)
        });
    }

}