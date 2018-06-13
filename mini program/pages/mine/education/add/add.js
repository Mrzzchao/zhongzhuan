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
      date_start: '',
      date_end: '',
      educational_history: ''
    },
    majorList: ['工科', '理科', '文科'],
    eduList: ['大专', '本科', '硕士', '博士', '其他'],

    isNew: true,

    checkKeyMap: {
        school_name: 'required',
        college_major: 'required',
        date_start: 'required',
        date_end: 'required',
        educational_history: 'required'
    },

    errorList: [] // 错误列表
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
    app.utils.Ajax.getEduItem(id).then((data) => {
      this.dataHandler(data)
      console.log(data)
    })
  },

  dataHandler(data) {
    const times = data.educated_time.split('-')
    const date_start = times[0].replace('.', '-')
    const date_end = times[1].replace('.', '-')

    data.date_start = date_start
    data.date_end = date_end
    console.log(data)
    this.changeInfo(data)
  },

  bindName(e) {
    const school_name = e.detail.value
    this.changeInfo({ school_name })
  },

  bindMajor(e) {
    const college_major = this.data.majorList[e.detail.value]
    this.changeInfo({ college_major })
  },
  bindName(e) {
    const school_name = e.detail.value
    this.changeInfo({ school_name })
  },
  bindName(e) {
    const school_name = e.detail.value
    this.changeInfo({ school_name })
  },

  bindDateStart(e) {
    const date_start = e.detail.value
    this.changeInfo({ date_start })
  },

  bindDateEnd(e) {
    const date_end = e.detail.value
    this.changeInfo({ date_end })
  },

  bindEdu(e) {
    const educational_history = this.data.eduList[e.detail.value]
    this.changeInfo({ educational_history })
  },

  changeInfo(obj) {
    let info = this.data.info
    info = Object.assign({}, info, obj)

    this.setData({
      info: info
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
    const isNew = this.data.isNew
    let data = this.data.info
    const checkKeyMap = this.data.checkKeyMap
    const errList = app.utils.FormCheck.checkSubmit(data, checkKeyMap)
    this.setData({
      errList
    })
    
    if(errList.length === 0) {
        data = this.formatSubmit(data)
        data.student_id = app.globalData.student_id
        app.utils.Ajax.submitEdu(data, isNew).then((flag) => {
            if(flag) {
                wx.navigateTo({
                    url: '/pages/mine/education/education',
                })
            }
        })
    }
  }
})
