// pages/wxs/wxs.js
import {
  GetDistance,
  getGreatCircleDistance
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 39.094057,117.130295 公司地址经纬度
    gslongitude: 117.130295,
    gslatitude: 39.094057,
    latitude: 0,
    longitude: 0,
    name: '',
    address: ''
  },
  localtion(e) {
    const that = this;
    wx.chooseLocation({
      success(res) {
        // console.log(res)
        const localtion = {
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        }
        that.setData({
          name: localtion.name,
          address: localtion.address,
          latitude: localtion.latitude,
          longitude: localtion.longitude
        })
      }
    })
  },

  handle() {
    wx.getLocation({
      success: res => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        // {latitude:this.data.latitude},
        // {longitude:this.data.longitude},
        // {latitude:this.data.gslatitude},
        // {longitude:this.data.gslongitude},
        const jl = getGreatCircleDistance(this.data.latitude,this.data.longitude,this.data.gslatitude,this.data.gslongitude)
        console.log(jl)
      }
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
    const that = this;
    wx.getLocation({
      altitude: 'true',
      isHighAccuracy: true,
      success(res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success (res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     wx.openLocation({
    //       latitude,
    //       longitude,
    //       scale: 5
    //     })
    //   }
    //  })
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