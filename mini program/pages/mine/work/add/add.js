// page/mine/work/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_name: '',
    title: '',
    work_intro: '',
    date_start: '',
    date_end: '',

    isNew: true,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        isNew: false,
        id: options.id
      })

      this.fetchData(options.id)
    }
  },

  fetchData(id) {
    app.utils.Ajax.getWorkItem(id).then((data) => {
      this.dataHandler(data)
      console.log(data)
    })
  },

  dataHandler(data) {
    const times = data.service_time.split('-')
    const date_start = times[0].replace('.', '-')
    const date_end = times[1].replace('.', '-')
    this.setData({
      date_start,
      date_end,
      title: data.title,
      company_name: data.company_name,
      work_intro: decodeURIComponent(data.work_intro),
      major: data.college_major,
      education: data.educational_history
    })
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
      ' - ' +
      data.date_end.replace('-', '.')

    data.work_intro = encodeURIComponent(data.work_intro)

    delete data.date_start
    delete data.date_end
    return data
  },

  formSubmit(e) {
    const data = this.formatSubmit(e.detail.value)
    const isNew = this.data.isNew
    isNew || (data.id = this.data.id)

    app.utils.Ajax.submitWork(data, isNew).then((flag) => {
      if (flag) {
        wx.navigateTo({
          url: '/pages/mine/work/work',
        })
      }
    })
  }
})