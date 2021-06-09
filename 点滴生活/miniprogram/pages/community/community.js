// pages/keepaccounts/keepaccounts.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 0, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit: 1, //是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel: 0, //是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '每日精选', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, // 此页面 页面内容距最顶部的距离

    bannerCurrent: 0, // 当前显示的banner
    bannerData: [{
        'id': 1,
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-1.jpg'
      },
      {
        'id': 2,
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-2.jpg'
      },
      {
        'id': 3,
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-3.jpg'
      },
      {
        'id': 4,
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-4.jpg'
      },
      {
        'id': 5,
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-5.jpg'
      },
    ],
  },

  toWritePost:function(){
    wx.navigateTo({
      url: '../community/writePost',
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