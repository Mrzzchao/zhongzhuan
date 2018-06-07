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
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  }
})