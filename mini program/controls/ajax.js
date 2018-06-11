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
  return WxFunc.requestPost(Api.skillOfStu, {student_id}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取教育列表
 */
function getEduList(student_id) {
  return WxFunc.requestPost(Api.educationOfStu, {student_id}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取工作列表
 */
function getWorkList(student_id) {
  return WxFunc.requestPost(Api.workOfStu, { student_id }).then((res) => {
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
function submitEdu(obj, isNew) {
    const url = isNew ? Api.educationAdd : Api.educationUpdate
    return WxFunc.requestPost(url, obj).then((res) => {
        if (res.code === 100) {
            return true
        }
    })
}

/**
 * 提交工作信息
 */
function submitWork(obj, isNew) {
  const url = isNew ? Api.workAdd : Api.workUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 提交技能信息
 */
function submitSkill(obj, isNew) {
  console.log(obj)
  console.log('------')
  const url = isNew ? Api.skillAdd : Api.skillUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 上传多张图片
 */
function uploadFiles(obj) {
  return WxFunc.uploadFiles({ url: Api.uploadImg, ...obj }).then((res) => {
    showToast('上传成功')
    console.log(res)
    return res
  })
}

/**
 * 下载学习资源
 */
function downloadFile(url) {
  console.log(url)
  return WxFunc.downloadFile({ url}).then((res) => {
    const url = res.tempFilePath
    return WxFunc.saveFile(url).then((res) => {
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
  const url = isNew ? Api.studentAdd : Api.studentUpdate
  return WxFunc.requestPost(url, obj).then((res) => {
    if (res.code === 100) {
      return true
    }
  })
}

/**
 * 获取学生信息
 */
function getStuInfo(wx_openid) {
  console.log(wx_openid)
  return WxFunc.requestPost(Api.studentItem, {wx_openid}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取学习资料列表
 */
function getResourceList() {
  return WxFunc.requestPost(Api.downloadList).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 获取学习资料单项
 */
function getResourceItem(id) {
  return WxFunc.requestPost(Api.downloadItem, {id}).then((res) => {
    if (res.code === 100) {
      return res.data
    }
  })
}

/**
 * 发送简历
 */
function sendResume({student_id, job_id}) {
  return WxFunc.requestPost(Api.resumeSend, { student_id, job_id }).then((res) => {
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
