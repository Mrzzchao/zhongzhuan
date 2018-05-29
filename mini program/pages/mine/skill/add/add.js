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
    uploadImgUrl: ''
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
        uploadImgUrl: tempFilePaths[0]
      })
      console.log(res)
    })
  },

  save(e) {
    console.log('save ')
    wx.navigateTo({
      url: '/pages/mine/skill/skill',
    })
  },

})