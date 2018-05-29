// components/normalPicker/normalPicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    val: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindVal(e) {
      this.setData({
        val: this.data.list[e.detail.value]
      })
    }
  }
})
