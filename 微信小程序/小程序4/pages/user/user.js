// pages/user/user.js
// 打卡
const {
  GetDistance
} = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    avatarUrl: '',
    nickName: '',
    city: '',
    //公司经度
    componyLongitude: 117.148804,
    //公司纬度
    componyLatitude: 39.072011
  },
  //当点击打卡是，检测手机位置和公司的位置，计算两个经纬度之间的直线距离
  //如果在 1 公里以内，可以打卡，否则打卡失败
  localtion() {
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            content:'请打开设置界面进行位置授权'
          })
        }
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // 获取手机位置
        let nowLongitude = res.longitude;
        let nowLatitude = res.latitude;
        //计算两点之间的距离
        let distance = GetDistance(nowLatitude, nowLongitude,
          this.data.componyLatitude, this.data.componyLongitude)
        if (distance < 1000) {
          wx.showToast({
            title: '打卡成功',
          })
        }
      }
    })
  },
  compass() {
    wx.navigateTo({
      url: '../compass/compass'
    })
    wx.navigateBack({
      success: res => {
        console.log(res)
      }
    })
  },
  // 设置
  setting() {
    wx.openSetting()
  },
  // 获取用户信息
  getUserInfo(userinfo) {
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: res => {
        console.log(res)
        const errMsg = res.errMsg;
        const status = errMsg.split(':');
        this.setData({
          status: status,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
          city: res.userInfo.country + " " + res.userInfo.province + " " + res.userInfo.city
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("onLoad")
    wx.getSetting({
      success: res => {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            withSubscriptions: true,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("onUnload")
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