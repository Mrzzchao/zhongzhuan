// page/job/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    job: {}  // 工作详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData(options.id)
  },
  formatData(data) {
    data.tags = data.tags.split(',')
    return data
  },
  fetchData(id) {
    app.utils.Ajax.getJobDetail(id).then((data) => {
      data = this.formatData(data)
      this.setData({ job: data })
    })
  }
})