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
    const download_url = this.data.resource.download_url
    const video_url = this.data.resource.video_url
    if(video_url) {
      wx.navigateTo({
        url: `/pages/webview/webview?url=${video_url}`,
      })
    } else {
      app.utils.Ajax.downloadFile(download_url).then((filePath) => {
        console.log(filePath)
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      })
    }
  }
})