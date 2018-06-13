// page/resource/ppt/ppt.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.fetchData(options.id)
  },

  fetchData(id) {
    app.utils.Ajax.getResourceItem(id).then((data) => {
      console.log(data)
      this.setData({
        resource: data
      })
    })
  },

  showToast(msg) {
    wx.showToast({
      title: msg,
    })
  },

  download() {
    const url = this.data.resource.download_url
    app.utils.Ajax.downloadFile(url).then((filePath) => {
      console.log(filePath)
      console.log('-------------')
      wx.openDocument({
        filePath: filePath,
        success: function (res) {
          wx.showToast({
            title: 'success',
          })
        },
        fail: (res) => {
          wx.showToast({
            title: 'fail',
          })

          console.log(res)
        },
        complete: (res) => {
          wx.showToast({
            title: 'compile',
          })
        }
      })
    })
  }
})