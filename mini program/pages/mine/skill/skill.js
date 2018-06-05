// page/mine/skill/skill.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skillStr: '27,28,29,30',
    skillList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },

  fetchData() {
    app.utils.Ajax.getSkillList(this.data.skillStr).then((data) => {
      this.setData({
        skillList: data
      })
    })
  },

  editSkill(e) {
    console.log('edit')
    wx.navigateTo({
      url: '/pages/mine/skill/add/add',
    })
  }
})