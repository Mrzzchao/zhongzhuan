const Api = require('../config/api.js')
const WxFunc = require('../common/wxFunc.js')


/**
 * 显示微信加载弹窗
 */
function showLoading() {
  wx.showLoading({
    title: '数据加载中...'
  })
}

/**
 * 关闭微信加载弹窗
 */
function hideLoading() {
  wx.hideLoading()
}


/**
 * 获取岗位列表
 */
function getJobList() {
  showLoading()
  return WxFunc.requestPost(Api.jobList).then((res) => {
    hideLoading()
    if(res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取岗位详情
 */
function getJobDetail(id) {
  showLoading()
  return WxFunc.requestPost(Api.jobDetail, {id}).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取教育列表
 */
function getEduList() {
  return WxFunc.requestPost(Api.educationList).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 提交教育信息
 */
function submitEdu(obj) {
  return WxFunc.requestPost(Api.educationAdd, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 获取工作列表
 */
function getWorkList() {
  return WxFunc.requestPost(Api.workList).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 提交工作信息
 */
function submitWork(obj) {
  return WxFunc.requestPost(Api.workAdd, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 获取技能列表
 */
function getSkillList() {
  return WxFunc.requestPost(Api.skillList).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 提交技能信息
 */
function submitSkill(obj) {
  return WxFunc.requestPost(Api.skillAdd, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}
module.exports = {
  getJobList,
  getJobDetail,
  getEduList,
  getWorkList,
  getSkillList,
  submitEdu,
  submitWork,
  submitSkill
}
