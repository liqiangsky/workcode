// pages/citys/citys.js
// var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');   // 引入腾讯地图SDK核心类
import {
  searchLetter,
  cityList,
  hotCity
} from './city'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "",
    hotCity: '',
    searchLetter: '',
    historyCity: [],
    cityList: '',
    local:'A'
  },

  selectcity(e) {
    //历史城市数据
    const historycity = this.data.historyCity;
    //事件对象dataset数据
    const city = e.currentTarget.dataset;
    //事件对象字母数据
    const cityzm = city.zm;

    console.log(city)
      // 是否存在选择的城市
      const isExist = historycity.some(item => {
        return item == city.city;
      })
      //存在城市所在数组索引
      const index = historycity.findIndex(item => {
        return item == city.city
      })
      //历史城市是否超过8
      if (historycity.length > 7) {
        historycity.splice(index, 1)
        historycity.unshift(city.city);
      } else {
        //存在所选城市  isExist=true ，删除数组中所选城市，所选城市添加到第一位
        if (isExist) {
          // console.log(index)
          historycity.splice(index, 1);
          historycity.unshift(city.city);
        } else {
          //不存在所选城市  isExist=false ，所选城市添加到第一位
          historycity.unshift(city.city);
        }
      }
    //将历史城市数据存到本地存储中
    wx.setStorage({
      data: historycity,
      key: 'historycity',
    })
    //修改数据
    this.setData({
      local:city.zm,
      city: city.city,
      historyCity: historycity
    })
  },

  // selectzm(e) {
  //   const zm = e.currentTarget.dataset.zm;
  //   const index = cityList.findIndex(item => {
  //     return item.initial == zm;
  //   });
  //   cityList.unshift(cityList[index]);
  //   cityList.splice(index + 1, 1);
  //   this.setData({
  //     cityList: cityList
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        // 发送请求通过经纬度反查地址信息  
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=2V6BZ-MFW3U-RYSVH-2QWIF-QBUTQ-FCBPS&get_poi=1";
        wx.request({
          url: getAddressUrl,
          success: res => {
            this.setData({
              city: res.data.result.address_component.city
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      searchLetter: searchLetter,
      hotCity: hotCity,
      cityList: cityList
    })
    wx.getStorage({
      key: 'historycity',
      success: res => {
        this.setData({
          historyCity: res.data,
        })
      }
    })
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