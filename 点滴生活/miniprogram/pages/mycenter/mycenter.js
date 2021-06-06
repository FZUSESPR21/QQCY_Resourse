// pages/mycenter/mycenter.js

const app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    permission:false,
    list:[],
    hasUserInfo: false,
    userInfo:{
      nickName:"用户昵称",  //用户昵称
      avatarUrl:"../../images/tt3x.png",  //用户头像
    },
    height: app.globalData.height * 2 + 20 , // 此页面 页面内容距最顶部的距离
    // 用户基本数据
    userData:{
      continuous:'-', //连续记账天数
      total:'-', //记账总天数
      accounts:'-', //记账总笔数
    },
    limit:'',
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if(!this.data.hasUserInfo){
       wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.cloud.callFunction({
          name:'addUser',
          data:{
            userPic:this.data.userInfo.avatarUrl,
            userName:this.data.userInfo.nickName
          }
        })
      }
    })
    }
   
  },

  setLimit:function(e){//设置月消费额度
    console.log(e.detail.value);
    wx.cloud.callFunction({
      name:'setLimit',
      data:{
        limit:e.detail.value
      }
    }).then(res=>{
      console.log(res);
    })
  },

  onLoad(option){
    //根据权限码确定是否显示审核界面
    wx.cloud.callFunction({
      name: 'getPermission',
      data: {
      }
    }).then(res => {
      console.log(res);
      if(res.result=='1')
      {
        this.setData({
          permission:true,
        })
      }
    })
  },
  toNotification:function(){
    wx.navigateTo({
      url: 'notificationlist'
    })
  },
  toRelease:function(){
    wx.navigateTo({
      url: 'release',
    })
  },

  toAuditing:function(){
    wx.navigateTo({
      url: 'auditing',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  swInput: function (e) {

    this.setData({
    
    sw: e.detail.value
    
    })
    
    },

  pcInput: function (e) {

    this.setData({
    
    pc: e.detail.value
    
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

    //目前阶段getUser云函数目前只搜索openid为test01的用户
    wx.cloud.callFunction({
      name: 'getUser',
    }).then(rest=>{
      console.log(rest);
      if(rest.result!=null){
        this.setData({
          'userData.total': rest.result.userTotalDays,
          'userData.continuous': rest.result.userDuration,
          'userData.accounts': rest.result.userTotalRecord,
          ['userInfo.avatarUrl']:rest.result.userPic,
          ['userInfo.nickName']:rest.result.userName,
          limit:rest.result.userlimit[0],
          hasUserInfo:true,
        })
      }
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