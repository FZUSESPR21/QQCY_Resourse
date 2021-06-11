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

    likeSrc:["../../images/agree.png","../../images/agree-active.png"],
    posts:[
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-1.jpg'
      },
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-2.jpg'
      },
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-3.jpg'
      },
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-4.jpg'
      },
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-5.jpg'
      },
    ],
  },

  toWritePost:function(){
    wx.navigateTo({
      url: '../community/writePost',
    })
  },

  move2detail:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    console.log(this.data.posts[index]._id);
    wx.navigateTo({
      url: '../tippage/tippage?id='+this.data.posts[index]._id,
    })
  },

  preview:function(e){
    var url = e.currentTarget.dataset.src;
    var index = e.currentTarget.dataset.index
    wx.previewImage({
      current:url,
      urls: this.data.posts[index].picArray,
    })
  },

  swiperChange:function(e){
    var index = e.detail.current;
    if(index == this.data.posts.length-1){
      wx.cloud.callFunction({
        name:'getAllPost',
        data:{
          length:this.data.posts.length
        }
      }).then(res=>{
        this.setData({
          posts:this.data.posts.concat(res.result.data)
        })
      })
    }
  },

  thumbup:function(e){
    var index = e.currentTarget.dataset.index;
    //需要设置一个人只能点一次
    this.setData({
      likeSrc:this.data.likeSrc.reverse()
    })
    wx.cloud.callFunction({
      name:'thumbup',
      data:{
        id:this.data.posts[index]._id,
      }
    }).then(res1=>{
      console.log(res1);
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
    wx.cloud.callFunction({
      name:'getAllPost',
      data:{
        length:0
      }
    }).then(res=>{
      this.setData({
        posts:res.result.data
      })
    })
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