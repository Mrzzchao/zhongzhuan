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

  fetchData() {
    const student_id = app.globalData.userInfo.openid
    app.utils.Ajax.getEduList(student_id).then((data) => {
      this.setData({
        eduList: data
      })
    })
  },

  editEdu(e) {
    console.log('edit-edu')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/education/add/add?id=${id}`,
    })
  },

  save(e) {
    console.log(e)
    app.globalData.fromPage = 'education'
    wx.switchTab({
      url: '/pages/mine/mine?type=education',
    })
  }
})