// page/mine/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workStr: '27,28,29,30',
    workList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },

  fetchData() {
    app.utils.Ajax.getWorkList(this.data.worklStr).then((data) => {
      this.setData({
        workList: data
      })
    })
  },

  editWork(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/work/add/add',
    })
  }
})