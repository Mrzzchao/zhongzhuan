const Api = require('../config/api.js')
const WxFunc = require('../common/wxFunc.js')


/**
 * 显示微信加载弹窗
 */
function showLoading(msg = '玩命加载中...') {
  wx.showLoading({
    title: msg,
    mask: true
  })
}

/**
 * 关闭微信加载弹窗
 */
function hideLoading() {
  wx.hideLoading()
}

/**
 * 打开微信提示弹窗
 */
function showToast(msg) {
  wx.showToast({
    title: msg
  })
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
 * 获取技能列表
 */
function getSkillList(student_id) {
  showLoading()
  return WxFunc.requestPost(Api.skillOfStu, {student_id}).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取教育列表
 */
function getEduList(student_id) {
  showLoading()
  return WxFunc.requestPost(Api.educationOfStu, {student_id}).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取工作列表
 */
function getWorkList(student_id) {
  showLoading()
  return WxFunc.requestPost(Api.workOfStu, { student_id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}


/**
 * 获取教育列表单项
 */
function getEduItem(id) {
  showLoading()
  return WxFunc.requestPost(Api.educationItem, { id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}


/**
 * 获取工作列表单项
 */
function getWorkItem(id) {
  showLoading()
  return WxFunc.requestPost(Api.workItem, { id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取技能列表单项
 */
function getSkillItem(id) {
  showLoading()
  return WxFunc.requestPost(Api.skillItem, { id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}



/**
 * 获取教育列表单项
 */
function getEduItem(id) {
  showLoading()
  return WxFunc.requestPost(Api.educationItem, { id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
* 提交教育信息
*/
function submitEdu(obj, isNew) {
  showLoading('玩命提交中...')
    const url = isNew ? Api.educationAdd : Api.educationUpdate
    return WxFunc.requestPost(url, obj).then((res) => {
      hideLoading()
        if (res.code === 100) {
            return true
        }
    })
}

/**
 * 提交工作信息
 */
function submitWork(obj, isNew) {
  showLoading('玩命提交中...')
  const url = isNew ? Api.workAdd : Api.workUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 提交技能信息
 */
function submitSkill(obj, isNew) {
  showLoading('玩命提交中...')
  const url = isNew ? Api.skillAdd : Api.skillUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 上传多张图片
 */
function uploadFiles(obj) {
  showLoading('玩命上传中...')
  return WxFunc.uploadFiles({ url: Api.uploadImg, ...obj }).then((res) => {
    hideLoading()
    showToast('上传成功')
    console.log(res)
    return res
  }).catch((res) => {
    hideLoading()
  })
}

/**
 * 下载学习资源
 */
function downloadFile(url) {
  showLoading('玩命下载中...')
  return WxFunc.downloadFile({ url}).then((res) => {
    const url = res.tempFilePath
    return WxFunc.saveFile(url).then((res) => {
      hideLoading()
      console.log(res)
      showToast('下载成功')
      return res.savedFilePath
    })
  })
}

/**
 * 提交学生信息
 */
function submitStu(obj, isNew) {
  showLoading('玩命提交中...')
  const url = isNew ? Api.studentAdd : Api.studentUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 获取学生信息
 */
function getStuInfo(wx_openid) {
  showLoading()
  return WxFunc.requestPost(Api.studentItem, {wx_openid}).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取学习资料列表
 */
function getResourceList() {
  showLoading()
  return WxFunc.requestPost(Api.downloadList).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取学习资料单项
 */
function getResourceItem(id) {
  showLoading()
  return WxFunc.requestPost(Api.downloadDetail, {id}).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 发送简历
 */
function sendResume({student_id, job_id}) {
  showLoading('玩命发送中...')
  return WxFunc.requestPost(Api.resumeSend, { student_id, job_id }).then((res) => {
    hideLoading()
    if (res.code === 100) {
      return res.data
    }
  })
}



module.exports = {
  getJobList,
  getJobDetail,
  getEduList,
  getWorkList,
  getSkillList,
  getResourceList,

  getResourceItem,
  getEduItem,
  getWorkItem,
  getSkillItem,

  submitEdu,
  submitWork,
  submitSkill,

  uploadFiles,
  downloadFile,
  
  submitStu,
  getStuInfo,

  sendResume
}
