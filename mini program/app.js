const Ajax = require('./controls/ajax.js')
const User = require('./controls/user.js')
const WxFunc = require('./common/wxFunc.js')
const FormCheck = require('./common/formCheck.js')
const schoolInfo = require('./config/schoolInfo.js')

App({
  onLaunch: function () {
    console.log('App Launch')
    User.login().then((data) => {
      Object.assign(this.globalData.userInfo, data)
      console.log(this.globalData.userInfo)
    })
  },

  globalData: {
    hasLogin: false,
    openid: null,
    userInfo: {},
    student_id: '',
    schoolInfo: schoolInfo
  },
  utils: {
    Ajax,
    WxFunc,
    User,
    FormCheck
  }
})
