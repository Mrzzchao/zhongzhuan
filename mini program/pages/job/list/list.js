// page/job/list/list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList: []  // 工作列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },
  formatData(data) {
    return data.map((job) => {
      job.tags = job.tags.split(',')
      return job
    })
  },
  fetchData() {
    app.utils.Ajax.getJobList().then((data) => {
      data = this.formatData(data)
      this.setData({jobList: data})
    })
  }
})