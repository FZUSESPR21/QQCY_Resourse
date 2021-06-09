// miniprogram/pages/makeaccount/makeaccount.js
const app = getApp()
const db = wx.cloud.database(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit:0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel:0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '审核', //导航栏 中间的标题
    },
    
    vlheight:"",
    length:[{
      index:1,
    },{index:2}],
    slideButtons: [{
      text: '查看具体',
     
    },{
      text: '通过',
      extClass: 'test',
      
    },{
      type: 'warn',
      text: '删除',
      extClass: 'test',
    }],

    posts: [
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"2",
        username:"用户2",
        content:"文章内容2",
        createTime: "2021年6月9日21:14:28"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
      {
        id:"1",
        username:"用户1",
        content:"文章内容1",
        createTime: "2021年6月8日21:14:05"
      },
    ]
  },

  returnback:function(){
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data 
    wx.cloud.callFunction({
      name: 'getNotAuditingPost',
    }).then(res => {
      data =res.result
      console.log(res.result)
      this.setData({
        posts: data,
      })
    })
},
slideButtonTap(e) {
  
  var index = e.currentTarget.dataset.index;
  console.log(index)
  console.log(this.data.posts[content].id)
  console.log('slide button tap', e.detail)
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