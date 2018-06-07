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
        skillList: this.formatData(data)
      })
    })
  },

  formatData(data) {
    return data.map((item) => {
      item.obtained_time = item.obtained_time.replace('-', '.')

      return item
    })
  },

  editSkill(e) {
    console.log('edit-skill')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/skill/add/add?id=${id}`,
    })
  },

  save(e) {
    console.log(e)
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  }
})