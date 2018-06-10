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
    const url = "http://store/wx93cc364dffcadf74.o6zAJsxwUEApzyvero6uK0FAPGWw.MSKaoChXDseB0b0b436d82f2dff8d492acf88f493143.png"
    this.setData({
      url
    })
  }
})