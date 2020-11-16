// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'https://127.0.0.1:3001/item/',
    products: [],
    orderlist: [],
    height: '',
    totle: 0,
    local:''
  },

  changNum(e) {
    const products = this.data.products;
    const data = e.currentTarget.dataset;
    const orderlist = this.data.orderlist;
    const productObj = products.find(item => {
      return item.id == data.itemlist.id;
    })
    const itemObj = productObj.data.find(item => {
      if (item.id == data.item.id) {
        item.num = +item.num + data.operand;
        this.data.totle += data.operand * item.price
        return item;
      }
    })
    const index = orderlist.indexOf(itemObj);
    if (index == -1) {
      orderlist.push(itemObj);
    } else {
      itemObj.num == 0 ? orderlist.splice(index, 1) : '';
    }
    this.setData({
      totle: this.data.totle,
      products: this.data.products,
      orderlist: orderlist
    })
    // console.log(this.data.orderlist)
  },

  isOk() {
    const totle = this.data.totle;
    if (totle != 0) {
      wx.navigateTo({
        url: '../orderinfo/orderinfo',
      })
    } else {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
    }
    wx.setStorage({
      data: this.data.orderlist,
      key: 'orderInfo',
    })
  },

  jump(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
     local:id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://127.0.0.1:3001/data/list.json',
      success: res => {
        // console.log(res)
        const info = res.data.data;
        // console.log(info)
        this.setData({
          products: info
        })
      }
    })
    wx.getSystemInfo({
      success: res => {
        // console.log(res)
        this.setData({
          height: res.windowHeight - 140
        })
      }
    })
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