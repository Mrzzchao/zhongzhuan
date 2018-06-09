// page/resource/resource.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resourceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },
  fetchData() {
    app.utils.Ajax.getResourceList().then((data) => {
      console.log(data)
      this.setData({
        resourceList: data
      })
    })
  }
})