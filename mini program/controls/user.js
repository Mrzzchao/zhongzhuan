const Api = require('../config/api.js')
const WxFunc = require('../common/wxFunc.js')

function checkAuth() {
  wx.getSetting({
    success: function (res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success(res) {
            console.log(res.userInfo)
            Object.assign(app.globalData.userInfo, res.userInfo)
          }
        })
      } else {

      }
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

function getUserInfo() {

}

module.exports = {
  login
}

