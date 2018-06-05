// page/mine/skill/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      name: '',
      img_url: '',
      obtained_time: ''
    },
    uploadImgUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindDate(e) {
    this.setData({
      obtained_time: e.detail.value
    })
  },

  chooseImg(e) {
    console.log(e)
    app.utils.WxFunc.chooseImage(e.currentTarget.dataset.type).then((res) => {
      const tempFilePaths = res.tempFilePaths
      this.setData({
        uploadImgUrls: [...this.data.uploadImgUrls, ...tempFilePaths]
      })
      console.log(res)
    })
  },

  formSubmit(e) {
    let formData = e.detail.value
    formData.timestamp = new Date().getTime()
    const uploadConfig = {
      filePathArr: this.data.uploadImgUrls,
      formData
    }
    app.utils.Ajax.submitSkill(uploadConfig).then((flag) => {
      console.log(flag)
      if(flag) {
        wx.showToast({
          title: '上传成功',
        })

        wx.navigateTo({
          url: '/pages/mine/skill/skill',
        })
      }
    })
  }

})