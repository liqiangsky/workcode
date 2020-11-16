// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    num1: -1,
    num2: 1,
    shuiguo: ["苹果"],
    msg: '',
    array: [{
        id: 1,
        name: 'jack',
        age: 18
      },
      {
        id: 2,
        name: 'lucy',
        age: 33
      },
      {
        id: 3,
        name: 'dava',
        age: 28
      },
      {
        id: 4,
        name: 'tom',
        age: 18
      }
    ],
    //元素节点
    nodes: [{
      name: 'h1',
      tyep: 'nodes',
      attrs: {
        class: 'h1',
        style: 'font-size:30px'
      },
      children: [{
          type: 'text',
          text: 'hello world!'
        },
        {
          type: 'text',
          text: 'HEhe'
        }
      ]
    }]
  },
  //子传父数据
  aa(e){
    console.log(e.detail)
    this.setData({
      msg:e.detail
    })
  },
  //-
  jian(e) {
    let n = e.currentTarget.dataset.num;
    this.setData({
      num: --n
    })
  },
  //+
  jia(e) {
    console.log(e.currentTarget.dataset.num)
    let n = e.currentTarget.dataset.num;
    this.setData({
      num: ++n
    })
  },
  //共用一个方法 使用data-*属性
  adddel(e) {
    console.log(e.currentTarget.dataset.num)
    let n = e.currentTarget.dataset.num;
    this.setData({
      num: this.data.num + n
    })
  },
  //水果多选
  shuiguo(e) {
    console.log(e);
    this.setData({
      shuiguo: e.detail.value,
    });
  },
  //input改变
  change(e) {
    this.setData({
      msg: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})