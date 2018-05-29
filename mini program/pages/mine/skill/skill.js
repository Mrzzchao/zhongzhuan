// page/mine/skill/skill.js
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

  editSkill(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/skill/add/add',
    })
  }
})