// page/mine/work/work.js

const app = getApp()
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
        workList: this.formatWork(data)
      })
    })
  },

  formatWork(data) {
    return data.map((item) => {
      let work_intro = decodeURIComponent(item.work_intro)
      item.work_intro = work_intro.split('\n')
      return item
    })
  },

  // 编辑工作经历
  editWork(e) {
    console.log('edit-work')
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/work/add/add?id=${id}`,
    })
  },

  save(e) {
    console.log(e)
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  }
})