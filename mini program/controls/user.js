const Api = require('../config/api.js')
const WxFunc = require('../common/wxFunc.js')


function checkAuth() {
  return WxFunc.getSetting().then((res) => {
    if (res.authSetting['scope.userInfo']) {

      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      return WxFunc.getUserInfo()
    } else {
      console.log('auth fail')
      return 
    }
  })
}


function login() {
  return WxFunc.login().then((res) => {
    const obj = {
      code: res.code
    }
    return WxFunc.requestPost(Api.wxSession, obj).then((data) => {
      console.log(data)
      return data
    })
  }) 
}

module.exports = {
  login,
  checkAuth
}

