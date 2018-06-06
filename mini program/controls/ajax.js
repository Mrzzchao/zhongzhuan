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
function getJobList(pageNo) {
  showLoading()
  return WxFunc.requestPost(Api.jobList, {pageNo}).then((res) => {
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
function getEduList(id) {
  return WxFunc.requestPost(Api.educationList, {id}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取教育列表单项
 */
function getEduItem(id) {
  return WxFunc.requestPost(Api.educationItem, { id }).then((res) => {
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
function getWorkList(id) {
  return WxFunc.requestPost(Api.workList, { id }).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取工作列表单项
 */
function getWorkItem(id) {
  return WxFunc.requestPost(Api.workItem, { id }).then((res) => {
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
function getSkillList(id) {
  return WxFunc.requestPost(Api.skillList, {id}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取技能列表单项
 */
function getSkillItem(id) {
  return WxFunc.requestPost(Api.skillItem, { id }).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 提交技能信息
 */
function submitSkill(obj) {
  return WxFunc.uploadFiles({url: Api.skillAdd, ...obj}).then((res) => {
    console.log(res)
    const flag = res.every((item) => {return item})
    return flag
  })
}

module.exports = {
  getJobList,
  getEduList,
  getWorkList,
  getSkillList,
  getEduItem,
  getWorkItem,
  getSkillItem,
  getJobDetail,
  submitEdu,
  submitWork,
  submitSkill
}
