// page/mine/skill/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    obtained_time: '',
    img_urls: '',

    uploadImgUrls: [],
    isUploaded: false,

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
    app.utils.Ajax.getSkillItem(id).then((data) => {
      this.dataHandler(data)
      console.log(data)
    })
  },

  dataHandler(data) {
    this.setData({
      name: data.name,
      obtained_time: data.obtained_time,
      uploadImgUrls: []
    })
  },

  bindDate(e) {
    this.setData({
      obtained_time: e.detail.value
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

      this.setData({
        img_urls: res.join(';')
      })

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
      let formData = e.detail.value
      formData.img_urls = this.data.img_urls
      formData.student_id = '22'

      const isNew = this.data.isNew
      isNew || (formData.id = this.data.id)
      

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