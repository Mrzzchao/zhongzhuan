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
      count: 1, // 默认9
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

module.exports = {
  request,
  requestPost,
  requestPayment,
  chooseImage
}
