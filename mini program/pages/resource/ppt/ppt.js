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

  download() {
    const url = this.data.resource.download_url
    app.utils.Ajax.downloadFile(url).then((res) => {
      console.log(res)
    })
  }
})