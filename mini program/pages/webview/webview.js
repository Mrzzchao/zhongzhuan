// pages/webview/webview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('web-view'),
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const url = options.url
    const url ='https://www.baidu.com'
    this.setData({
      url
    })
  }
})