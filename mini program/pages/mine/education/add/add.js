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

    isNew: true,
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
    console.log(this.data.info)
    const isNew = this.data.isNew
    let data = JSON.parse(JSON.stringify(this.data.info))
    data = this.formatSubmit(data)
    
    app.utils.Ajax.submitEdu(data, isNew).then((flag) => {
      if(flag) {
        wx.navigateTo({
          url: '/pages/mine/education/education',
        })
      }
    })
  }
})