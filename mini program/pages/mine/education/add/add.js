// page/mine/education/add/add.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      school_name: '',
      college_major: '',
      educated_time: '',
      educational_history: ''
    },
    majorList: ['网络工程', '计算机'],
    eduList: ['大专', '本科', '硕士', '博士', '其他'],
    school_name: '',
    major: '',
    date_start: '',
    date_end: '',
    education: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.fetchData(options.id)
  },

  fetchData(id) {
    app.utils.Ajax.getEduItem(id).then((data) => {
      this.dataHandler(data)
      console.log(data)
    })
  },

  dataHandler(data) {
    const times = data.educated_time.split('-')
    const date_start = times[0].replace('.', '-')
    const date_end = times[1].replace('.', '-')
    this.setData({
      date_start,
      date_end,
      school_name: data.school_name,
      major: data.educational_history,
      education: data.educational_history
    })
  },

  bindMajor(e) {
    this.setData({
      major: this.data.majorList[e.detail.value]
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

  bindEdu(e) {
    this.setData({
      education: this.data.eduList[e.detail.value]
    })
  },
  
  formatSubmit(data) {
    data.educated_time = 
    data.date_start.replace('-', '.') + 
    '-' + 
    data.date_end.replace('-', '.')

    delete data.date_start
    delete data.date_end
    return data
  },

  formSubmit(e) {
    const data = this.formatSubmit(e.detail.value)
    app.utils.Ajax.submitEdu(data).then((flag) => {
      if(flag) {
        wx.navigateTo({
          url: '/pages/mine/education/education',
        })
      }
    })
  }
})