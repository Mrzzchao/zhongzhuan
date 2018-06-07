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
    classList:[ 
      [...app.globalData.schoolInfo.grades],
      [...app.globalData.schoolInfo.majors],
      [...app.globalData.schoolInfo.className]
    ],

    sex: '',
    date: '',
    education: '',
    classStr: '',

    isNew: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              Object.assign(app.globalData.userInfo, res.userInfo)
              this.setData({
                userInfo: app.globalData.userInfo
              })
            }
          })
        } else {
          console.log('fail')
        }
      }
    })
    this.fetchData()
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    Object.assign(app.globalData.userInfo, e.detail.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
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
      education: this.data.eduHisList[e.detail.value]
    })
  },

  bindClass(e) {
    console.log(e)
    let classStr = ''
    const multiIndex = e.detail.value
    const gradeIdx = multiIndex[0]
    const majorIdx = multiIndex[1]
    const classIdx = multiIndex[2]

    const grade = this.data.classList[0][gradeIdx]
    const major = this.data.classList[1][majorIdx]
    const c = this.data.classList[2][classIdx]

    classStr = grade + ' ' + major + ' ' + c

    this.setData({
      classStr
    })
  },

  fetchData() {

    app.utils.Ajax.getEduList().then((data) => {
      this.setData({
        eduList: data
      })
    })
    app.utils.Ajax.getEduList().then((data) => {
      this.setData({
        eduList: data
      })
    })

    app.utils.Ajax.getSkillList(this.data.skillStr).then((data) => {
      this.setData({
        skillList: this.formatSkill(data)
      })
    })

    app.utils.Ajax.getWorkList(this.data.workStr).then((data) => {
      this.setData({
        workList: this.formatWork(data)
      })
    })
  },

  formatWork(data) {
    return data.map((item) => {
      let work_intro = decodeURIComponent(item.work_intro)
      item.work_intro = work_intro.split('\n')
      
      return item
    })
  },

  formatSkill(data) {
    return data.map((item) => {
      item.obtained_time = item.obtained_time.replace('-', '.')

      return item
    })
  },

  // 提交表单
  formSubmit(e) {
    const data = e.detail.value
    data.wx_openid = this.data.userInfo.openid
    data.wx_img = this.data.userInfo.avatarUrl
    data.education_experience = this.data.eduStr
    data.work_experience = this.data.workStr
    data.skill_certification = this.data.skillStr

    console.log(data)
    const isNew = this.data.isNew
    isNew || (data.id = this.data.id)
    app.utils.Ajax.submitStu(data, isNew).then((flag) => {
      console.log(flag)
    })
  }
})