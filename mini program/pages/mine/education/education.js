// page/mine/education/education.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eduStr: '27,28,29,30',
    eduList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },

  fetchData() {
    app.utils.Ajax.getEduList(this.data.eduStr).then((data) => {
      this.setData({
        skillList: data
      })
    })
  },

  editEdu(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/education/add/add',
    })
  }
})