// page/job/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    job: {}  // 工作详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app)
    this.fetchData(options.id)
  },
  formatData(data) {
    data.tags = data.tags.split(',')
    let job_detail = decodeURIComponent(data.job_detail)

    let detailArr = job_detail.split('&&&&')
    let intros = detailArr[0].split('\n')
    let requirements = detailArr[1].split('\n')

    data.intros = intros
    data.requirements = requirements
    data.company_logo = data.company_logo || 'https://www.lgzzcjb.com/asserts/images/company-default.png'
    return data
  },
  
  fetchData(id) {
    app.utils.Ajax.getJobDetail(id).then((data) => {
      data = this.formatData(data)
      this.setData({ job: data })
    })
  },

  sendResume(e) {
    console.log(app)
    const student_id = app.globalData.student_id
    if(student_id) {
      const params = {
        job_id: this.data.job.id,
        student_id: app.globalData.student_id
      }
      app.utils.Ajax.sendResume(params).then((data) => {
        if(data) {
          wx.showToast({
            title: '联系成功',
          })
        } else {
          wx.showToast({
            title: '联系失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    }
  }
})