// page/mine/work/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      company_name: '',
      title: '',
      service_time: '',
      work_intro: ''
    },
    date_start: '',
    date_end: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  },

  bindDateStart(e) {
    this.setData({
      date_start: e.detail.value
    })
  },

  bindDateEnd(e) {
    this.setData({
      date_end: e.detail.value
    })
  },

  formatSubmit(data) {
    data.service_time =
      data.date_start.replace('-', '.') +
      '-' +
      data.date_end.replace('-', '.')

    delete data.date_start
    delete data.date_end
    return data
  },

  formSubmit(e) {
    const data = this.formatSubmit(e.detail.value)
    app.utils.Ajax.submitWork(data).then((flag) => {
      if (flag) {
        wx.navigateTo({
          url: '/pages/mine/work/work',
        })
      }
    })
  }
})