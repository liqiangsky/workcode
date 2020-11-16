// components/zj/zj.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    msg:"子组件中的数据"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(){
      this.setData({
        msg:"被修改了！"
      })
    },
    fn(){
      this.triggerEvent('abc',this.data.msg)
    }
  }
})
