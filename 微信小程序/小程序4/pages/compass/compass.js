// pages/compass/compass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: '---',
    deg: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //定义数组存储各方向
    let directionArr = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];
    // 转动方向时， 让图片随着转动反向转动
    //微信小程序中提供 oncompassChange()方法监听手机转动
    wx.onCompassChange((result) => {
      console.log(result)
      // 根据当前角度，判断属于哪个方向，计算公式 parseInt((当前角度＋22.5)/ 45)
      let index = parseInt((result.direction + 22.5) / 45) % 8;
      let direction = directionArr[index];
      this.setData({
        direction,
        deg: result.direction
      })
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
    wx.stopCompass()
    wx.switchTab({
      url:'../user/user'
    })
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