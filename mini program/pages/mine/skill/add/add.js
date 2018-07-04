// page/mine/skill/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    info: {
      name: '',
      obtained_time: '',
      img_urls: '',

    },


    uploadImgUrls: [],
    isUploaded: false,

    isNew: true,

    checkKeyMap: {
        name: 'required',
        obtained_time: 'required',
        img_urls: 'required',
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
    app.utils.Ajax.getSkillItem(id).then((data) => {
      this.dataHandler(data)
      console.log(data)
    })
  },

  dataHandler(data) {
    this.changeInfo(data)
    this.setData({
      uploadImgUrls: []
    })
  },

  bindName(e) {
    const name = e.detail.value
    this.changeInfo({ name })
  },
  bindDate(e) {
    const obtained_time = e.detail.value
    this.changeInfo({ obtained_time })
  },

  changeInfo(obj) {
    let info = this.data.info
    info = Object.assign({}, info, obj)

    this.setData({
      info: info
    })
  },

  chooseImg(e) {
    app.utils.WxFunc.chooseImage(e.currentTarget.dataset.type).then((res) => {
      const tempFilePaths = res.tempFilePaths
      this.setData({
        uploadImgUrls: [...this.data.uploadImgUrls, ...tempFilePaths]
      })
      this.uploadFile()
    })
  },

  uploadFile() {
    let formData = {}
    const uploadConfig = {
      formData,
      filePathArr: this.data.uploadImgUrls
    }

    this.setData({
      isUploaded: false
    })
    app.utils.Ajax.uploadFiles(uploadConfig).then((res) => {
      console.log(res)

      const img_urls = res.join(';')
      this.changeInfo({ img_urls })

      this.setData({
        isUploaded: true
      })
    })
  },

  // 检查提交表单
  checkSubmit(data, checkKeyMap) {
    let errList = []
    Object.keys(checkKeyMap).forEach((key) => {
      let name = checkKeyMap[key]
      let value = data[key]
      let result = app.utils.FormCheck.check(name, value)

      result && errList.push(result)
      console.log(errList)
    })
    return errList
  },

  formSubmit(e) {
    if (app.globalData.userInfo.openid) {
      if(this.data.isUploaded) {  // 图片上传成功才能提交
        let formData = this.data.info
        formData.student_id = app.globalData.userInfo.openid
        const isNew = this.data.isNew
        const checkKeyMap = this.data.checkKeyMap
        const errList = app.utils.FormCheck.checkSubmit(formData, checkKeyMap)
        this.setData({
          errList
        })
        
        if(errList.length === 0) {
            app.utils.Ajax.submitSkill(formData, isNew).then((flag) => {
                console.log(flag)
                if(flag) {
                    wx.navigateTo({
                        url: '/pages/mine/skill/skill',
                    })
                }
            })
        }

      } else {
        this.setData({
          errList: ['图片未上传']
        })
      }

    } else {
      wx.showToast({
        title: '保存失败'
      })
    }
  }
})
