// page/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {
      real_name: '',
      sexuality: '',
      born_date: '',
      highest_education: '',
      mobile: '',
      email: '',
      education_experience: [],
      work_experience: [],
      skill_certification: []
    },
    eduStr: '27,28,29,30',
    eduList: [],
    skillStr: '27,28,29,30',
    skillList: [],
    workStr: '27,28,29,30',
    workList: [],

    sexList: ['保密', '男', '女'],
    eduHisList: ['大专', '本科', '硕士', '博士', '其他'],
    sex: '',
    date: '',
    education: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.fetchData()
  },
  // 编辑教育经历
  editEdu(e) {
    console.log('edit-edu')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/education/add/add?id=${id}`,
    })
  },

  // 编辑工作经历
  editWork(e) {
    console.log('edit-work')
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/work/add/add?id=${id}`,
    })
  },

  // 编辑技能正式
  editSkill(e) {
    console.log('edit-skill')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/skill/add/add?id=${id}`,
    })
  },

  bindSex(e) {
    this.setData({
      sex: this.data.sexList[e.detail.value]
    })
  },
  bindDate(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindEdu(e) {
    this.setData({
      education: this.data.eduList[e.detail.value]
    })
  },

  fetchData() {
    app.utils.Ajax.getEduList().then((data) => {
      this.setData({
        eduList: data
      })
    })

    app.utils.Ajax.getSkillList(this.data.skillStr).then((data) => {
      this.setData({
        skillList: data
      })
    })

    app.utils.Ajax.getWorkList(this.data.workStr).then((data) => {
      this.setData({
        workList: data
      })
    })
  },

  // 提交表单
  formSubmit(e) {
    console.log(e)
  }
})