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
    major: '',
    date_start: '',
    date_end: '',
    education: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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