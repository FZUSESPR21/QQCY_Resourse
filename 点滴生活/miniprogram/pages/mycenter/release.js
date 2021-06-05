
// pages/mycenter/notificationlist.js
const db = wx.cloud.database();
const app = getApp();


// 发布浏览最长字数
const maxLenth = 180
var pixelRatio1 = 750 / wx.getSystemInfoSync().windowWidth;   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit: 0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel: 0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '我的发布', //导航栏 中间的标题
    },
    slideposition:"0",//0表示此时滑块在左边，1表示在右边
    incomecolor:"",
    expendcolor:"",
    condition:true,
    condition1:false,
    chosenList:[],
    nonchosenList:[],
    
  },

  backToMycenter(){
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChosen();
    this.getNonChosen()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.animation = wx.createAnimation({duration:300});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  slidemove(){
    console.log("你点击了滑块",this.data.slideposition);
    var px1 = 126 / pixelRatio1;
    if(this.data.slideposition==0){
    this.animation.translate(px1).step()
    this.setData({animation: this.animation.export()})
    this.setData({slideposition:1,incomecolor:"#FFFFFF",expendcolor:"#909090"})
    this.setData({
      condition:false,
      condition1:true
    })
  }
    else{
      this.animation.translate(0).step()
      this.setData({animation: this.animation.export()})
      this.setData({slideposition:0,incomecolor:"#909090",expendcolor:"#FFFFFF"})
      this.setData({
        condition:true,
        condition1:false
      })
    }
  },
  getChosen(){
    wx.cloud.callFunction({
      name:'getPost',
      data:{
        state:'1',   //1表示入选
      }
    }).then(res=>{
      console.log('入选请求成功', res)
      var content
      for(var i=0;i<res.result.length;i++){
        content = res.result[i].content
        content = content.length>maxLenth?content.slice(0,maxLenth)+"...":content
        this.setData({
          ["chosenList["+i+"].content"]:content,
          ["chosenList["+i+"].time"]:res.result[i].createTime,
          ["chosenList["+i+"].id"]:res.result[i]._id
        })
      }
    })
    .catch(err=>{
      console.log('已入选请求失败', err)
    })
  },
  getNonChosen(){
    wx.cloud.callFunction({
      name:'getPost',
      data:{
        state:'0',   //0表示未入选
      }
    }).then(res=>{
      console.log('未入选请求成功', res)
      var content
      for(var i=0;i<res.result.length;i++){
        content = res.result[i].content
        content = content.length>maxLenth?content.slice(0,maxLenth)+"...":content
        this.setData({
          ["nonchosenList["+i+"].content"]:content,
          ["nonchosenList["+i+"].time"]:res.result[i].createTime,
          ["nonchosenList["+i+"].id"]:res.result[i]._id
        })
      }
      console.log("getnonchosen", res)
    })
    .catch(err=>{
      console.log('未入选请求失败', err)
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