// page/mine/work/work.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },

  fetchData() {
    const student_id = app.globalData.student_id
    app.utils.Ajax.getWorkList(student_id).then((data) => {
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
    app.globalData.fromPage = 'work'
    wx.switchTab({
      url: '/pages/mine/mine?type=work',
    })
  }
})