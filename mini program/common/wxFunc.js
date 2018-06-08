/**
 * 封装微信的request
 */
function request(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的request
 */
function requestPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method: 'POST',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的requestPayment
 */
function requestPayment(obj) {
  let {timeStamp, nonceStr, signType, paySign} = obj
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp,
      nonceStr,
      signType,
      paySign,
      "package": obj.package,

      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的chooseImage
 */
function chooseImage(type) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        resolve(res)
      },
      fail(e) {
        reject(e)
      }
    })
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的login
 */
function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        console.log(res)
        if (res.code) {
          resolve(res)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的checkSession
 */
function checkSession() {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    });
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}


/**
 * 封装微信的uploadFile
 */
function uploadFile({url, filePath, name, formData = {}}) {
  let uploadTask = null
  return new Promise((resolve, reject) => {
    uploadTask = wx.uploadFile({
      url,
      filePath,
      name,
      formData,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res.data)
        uploadTask.abort() // 取消上传任务
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      console.log('--------------------------------')
    })
  }).then((res) => {
    res = JSON.parse(res)
    if(res.code === 100) {
      return res.url
    } else {
      return false
    }
  }).catch((e) => {
    console.log('请求错误:', e)
    uploadTask.abort() // 取消上传任务
  })

}

/**
 * 多图片上传
 */
function uploadFiles({ url, filePathArr = [], name = 'file', formData = {} }){
  console.log(filePathArr)
  console.log(url)
  let uploadArr = filePathArr.map((filePath) => {
    return uploadFile({url, filePath, name, formData})
  })
  return Promise.all(uploadArr).catch((e) => {
    console.log('上传失败:', e)
  })
}

/**
 * 封装微信的downloadFile
 */
function downloadFile({ url}) {
  let downloadTask = null
  return new Promise((resolve, reject) => {
    downloadTask = wx.downloadFile({
      url,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
        downloadFile.abort() // 取消下载任务
      }
    })

    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      console.log('--------------------------------')
    })
  }).catch((e) => {
    console.log('请求错误:', e)
    downloadFile.abort() // 取消下载任务
  })

}

/**
 * 封装微信的getSetting
 */
function getSetting() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    });
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}

/**
 * 封装微信的getUserInfo
 */
function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    });
  }).catch((e) => {
    console.log('请求错误:', e)
  })
}


module.exports = {
  request,
  requestPost,
  requestPayment,
  chooseImage,
  uploadFile,
  uploadFiles,

  login,
  checkSession,

  getSetting,
  getUserInfo
}
