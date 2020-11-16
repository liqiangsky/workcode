const {
  formatTime
} = require("../../utils/util")

// pages/orderinfo/orderinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postalCode: '',
    telNumber: '',
    address: '',
    city: '',
    orderinfo: [],
    url: 'https://127.0.0.1:3001/item/',
    totle: 0,
    time: ''
  },

  chooseAddress() {
    wx.chooseAddress({
      success: result => {
        console.log(result)
        this.setData({
          postalCode: result.postalCode,
          telNumber: result.telNumber,
          address: result.userName + result.provinceName + result.cityName + result.countyName + result.detailInfo,
          city: result.provinceName + " " + result.cityName + " " + result.countyName
        })
      }
    })
  },

  submit() {
    const postalCode = this.data.postalCode;
    const telNumber = this.data.telNumber;
    const address = this.data.address;
    const city = this.data.city;
      if (postalCode == '' || telNumber == '' || address == '' || city == '') {
        wx.showToast({
          title: '请选择地址',
          icon: 'none'
        })
      } else {
        // wx.
        // if(){

        // }
        this.data.orderinfo.forEach(item => {
          item.ordertime = formatTime(new Date())
        })
        this.setData({
          orderinfo: this.data.orderinfo
        })
        wx.setStorage({
          data: this.data.orderinfo,
          key: 'orderInfo',
        })
        wx.switchTab({
          url: '../order/order'
        })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'orderInfo',
      success: res => {
        const orderinfo = res.data;
        orderinfo.forEach(item => {
          this.data.totle += item.num * item.price;
        })
        this.setData({
          orderinfo: orderinfo,
          totle: this.data.totle
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