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
      work_intro: '',
      date_start: '',
      date_end: '',
      id: ''
    },

    isNew: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        isNew: false
      })

      this.fetchData(options.id)
    }
  },

  fetchData(id) {
    app.utils.Ajax.getWorkItem(id).then((data) => {
      this.dataHandler(data)
    })
  },

  dataHandler(data) {
    const times = data.service_time.split('-')
    const date_start = times[0].replace('.', '-')
    const date_end = times[1].replace('.', '-')
    
    data.date_start = date_start
    data.date_end = date_end

    data.work_intro = decodeURIComponent(data.work_intro)

    this.changeInfo(data)
  },


  bindName(e) {
    console.log(e)
    const company_name = e.detail.value
    this.changeInfo({ company_name })
  },
  bindTitle(e) {
    const title = e.detail.value
    this.changeInfo({ title })
  },
  bindIntro(e) {
    const work_intro = e.detail.value
    this.changeInfo({ work_intro })
  },
  bindDateStart(e) {
    const date_start = e.detail.value
    this.changeInfo({date_start})
  },
  bindDateEnd(e) {
    const date_end = e.detail.value
    this.changeInfo({ date_end })
  },

  changeInfo(obj) {
    let info = this.data.info
    info = Object.assign({}, info, obj)

    this.setData({
      info: info
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
    console.log(this.data.info)
    const isNew = this.data.isNew
    let data = JSON.parse(JSON.stringify(this.data.info))
    data = this.formatSubmit(data)

    app.utils.Ajax.submitWork(data, isNew).then((flag) => {
      if (flag) {
        wx.navigateTo({
          url: '/pages/mine/work/work',
        })
      }
    })
  }
})