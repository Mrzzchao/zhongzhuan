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
      wx.showToast({
        title: '上传成功',
      })
    })
  },

  formSubmit(e) {
    if(this.data.isUploaded) {  // 图片上传成功才能提交
      let formData = this.data.info
      formData.student_id = '22'
      const isNew = this.data.isNew
      console.log(formData)
      app.utils.Ajax.submitSkill(formData, isNew).then((flag) => {
        console.log(flag)
        if(flag) {
          wx.navigateTo({
            url: '/pages/mine/skill/skill',
          })
        }
      })

    }
  }

})