// page/mine/work/work.js
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
  editWork(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/work/add/add',
    })
  }
})