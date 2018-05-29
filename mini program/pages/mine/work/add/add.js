// page/mine/work/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  save(e) {
    console.log('save ')
    wx.navigateTo({
      url: '/pages/mine/work/work',
    })
  }
})