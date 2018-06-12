// page/job/list/list.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobList: [],  // 工作列表
    loadInfo: {
      status: 'none',
      msg: '上滑加载更多'
    },
    loadMsg: {
      '0': {
        status: 'load',
        msg: '上滑加载更多'
      },
      '1': {
        status: 'loading',
        msg: '加载中...'
      },
      '2': {
        status: 'loaded',
        msg: '已经到底了...'
      }
    },
    pageNo: 1
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
      job.create_time = job.create_time.slice(5, 11)
      job.company_logo = job.company_logo || 'https://www.yukisa.com/asserts/images/company-default.png'

      return job
    })
  },
  fetchData(page = 1) {
    return app.utils.Ajax.getJobList(page).then((data) => {
      data = this.formatData(data)
      this.setData({jobList: this.data.jobList.concat(data)})
      return data
    })
  },
  scrollToEnd(e) {
    let loadInfo = this.data.loadInfo
    if (loadInfo.status === 'loaded') {
      return;
    }

    let nextPage = this.data.pageNo + 1
    this.setData({
      loadInfo: this.data.loadMsg[1]
    })
    this.setData({
      pageNo: nextPage
    })
    this.fetchData(nextPage).then((data) => {
      if (data.length) {  // 存在数据
        this.setData({
          loadInfo: this.data.loadMsg[0]
        })
      } else {           // 已全部加载
        this.setData({
          loadInfo: this.data.loadMsg[2]
        })
      }
    })
  },
  scroll(e) {
    console.log('-----')
    console.log(e)
  }
})