// page/mine/education/education.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },

  editEdu(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/education/add/add',
    })
  },

  fetchData() {
    app.utils.Ajax.getEduList().then((data) => {
      this.setData({
        eduList: data
      })
    })
  }
})