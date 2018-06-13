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
      classStr: '',
      mobile: '',
      email: ''
    },

    eduList: [],
    skillList: [],
    workList: [],

    sexList: ['保密', '男', '女'],
    eduHisList: ['大专', '本科', '硕士', '博士', '其他'],
    classList:[
      [...app.globalData.schoolInfo.grades],
      [...app.globalData.schoolInfo.majors],
      [...app.globalData.schoolInfo.className]
    ],

    isNew: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasLogin: false,

    checkKeyMap: {
        real_name: 'xingming',
        sexuality: 'required',
        born_date: 'required',
        highest_education: 'required',
        classStr: 'required',
        mobile: 'phone',
        email: 'email'
    },

    errList: [] // 错误列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.checkAuth()
  },

  onShow() {
    if (app.globalData.hasLogin) {
      switch (app.globalData.fromPage) {
        case 'work': this.fetchWork(); break;
        case 'skill': this.fetchSkill(); break;
        case 'education': this.fetchEdu(); break;
      }
    }
  },

  checkAuth() {
    app.utils.User.checkAuth().then((res) => {
      console.log(res.userInfo)
      Object.assign(app.globalData.userInfo, res.userInfo)

      this.setData({
        userInfo: app.globalData.userInfo
      })
      // 设置登录态
      app.globalData.hasLogin = true
      this.setData({
        hasLogin: true
      })
      this.fetchData(this.data.userInfo.openid)
    })
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    Object.assign(app.globalData.userInfo, e.detail.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      hasLogin: true
    })

    this.fetchData(this.data.userInfo.openid)
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

  // 编辑技能证书
  editSkill(e) {
    console.log('edit-skill')
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/skill/add/add?id=${id}`,
    })
  },

  bindName(e) {
    const real_name = e.detail.value
    this.changeInfo({ real_name })
  },
  bindMobile(e) {
    const mobile = e.detail.value
    this.changeInfo({ mobile })
  },
  bindEmail(e) {
    const email = e.detail.value
    this.changeInfo({ email })
  },
  bindSex(e) {
    const sexuality = this.data.sexList[e.detail.value]
    this.changeInfo({ sexuality })
  },
  bindSex(e) {
    const sexuality = this.data.sexList[e.detail.value]
    this.changeInfo({ sexuality })
  },
  bindSex(e) {
    const sexuality = this.data.sexList[e.detail.value]
    this.changeInfo({ sexuality })
  },
  bindDate(e) {
    const born_date = e.detail.value
    this.changeInfo({ born_date})
  },
  bindEdu(e) {
    const highest_education = this.data.eduHisList[e.detail.value]
    this.changeInfo({ highest_education})
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

    this.changeInfo({classStr})
  },

  changeInfo(obj) {
    let info = this.data.info
    info = Object.assign({}, info, obj)

    this.setData({
      info: info
    })
  },

  fetchData(wx_openid) {
    wx.showLoading({
      title: '加载中'
    })
    app.utils.Ajax.getStuInfo(wx_openid).then((data) => {
      if(!Object.keys(data).length) {  // 假如无该学生信息
        this.setData({
          isNew: true
        })
        return
      }
      this.changeInfo(data)
      const student_id = data.student_id
      app.globalData.student_id = student_id

      const requestList = [this.fetchWork(), this.fetchSkill(), this.fetchEdu()]
      Promise.all(requestList).then((results) => {
        console.log(results)
        wx.hideLoading()
      })
    })

  },

  fetchWork() {
    const student_id = app.globalData.student_id

    return app.utils.Ajax.getWorkList(student_id).then((data) => {
      console.log(data)
      this.setData({
        workList: this.formatWork(data)
      })
    })
  },

  fetchEdu() {
    const student_id = app.globalData.student_id

    return app.utils.Ajax.getEduList(student_id).then((data) => {
      console.log(data)
      this.setData({
        eduList: data
      })
    })
  },

  fetchSkill() {
    const student_id = app.globalData.student_id

    return app.utils.Ajax.getSkillList(student_id).then((data) => {
      this.setData({
        skillList: this.formatWork(data)
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

  // 检查提交表单
  checkSubmit(data, checkKeyMap) {
    let errList = []
    Object.keys(checkKeyMap).forEach((key) => {
      let name = checkKeyMap[key]
      let value = data[key]
      let result = app.utils.FormCheck.check(name, value)

      result && errList.push(result)
      console.log(errList)
    })
    return errList
  },

  // 提交表单
  formSubmit(e) {
    const data = this.data.info
    const isNew = this.data.isNew
    const checkKeyMap = this.data.checkKeyMap
    const errList = app.utils.FormCheck.checkSubmit(data, checkKeyMap)
    this.setData({
      errList
    })

    if(errList.length === 0) {
      data.wx_openid = this.data.userInfo.openid
      data.wx_img = this.data.userInfo.avatarUrl
      console.log(data)

      app.utils.Ajax.submitStu(data, isNew).then((flag) => {
        console.log(flag)
        wx.showToast({
          title: '保存成功'
        })
      })
    }
  }
})
