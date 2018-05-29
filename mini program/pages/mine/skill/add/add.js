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
    }
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
    app.utils.WxFunc.chooseImage('camera').then((res) => {
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