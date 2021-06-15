// pages/mycenter/notificationlist.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit: 0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel: 0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '我的通知', //导航栏 中间的标题
    },
    condition:true,
    loadingHidden: false,
    condition1:false,
    condition2:false,
    commentlist:[
      {
        _id:0,
        title:"评论信息",
        mark:"已读",
        time:"04-08 00:20",
        content:"有人评论了今日你发布的小妙招，快前往社区查看吧！",
      },
    ],
    examinelist:[
      
    ],
    thumbsuplist:[
      {
        id:0,
        title:"点赞信息",
        time:"04-08 00:20",
        content:"有人评论了今日你发布的小妙招，快前往社区查看吧！",
      },
      {
        id:1,
        title:"点赞信息",
        time:"04-08 00:20",
        content:"有人评论了今日你发布的小妙招，快前往社区查看吧！",
      },
      {
        id:2,
        title:"点赞信息",
        time:"04-08 00:20",
        content:"有人评论了今日你发布的小妙招，快前往社区查看吧！",
      },
      {
        id:3,
        title:"点赞信息",
        time:"04-08 00:20",
        content:"有人评论了今日你发布的小妙招，快前往社区查看吧！",
      },
    ],
    showtab: 0,  //顶部选项卡索引
    tabnav: {
      tabnum: 5,
      tabitem: [
        {
          "id": 0,
          "text": "文章审核"
        },
        {
          "id": 1,
          "text": "评论"
        },
        {
          "id": 2,
          "text": "赞"
        },
      ]
    },
    productList: [],
    list: 0,
  },

  backToMycenter(){
    wx.navigateBack();
  },

  getExamine(){
    wx.cloud.callFunction({
      name:'getNotification',
      data:{
        type:'审核信息'
      }
    }).then(res=>{
      console.log('审核通知请求成功',res)
      this.setData({
        examinelist: res.result
      })
    })
  },

  getComment(){
    wx.cloud.callFunction({
      name:'getNotification',
      data:{
        type:'评论'
      }
    }).then(res=>{
      console.log('评论通知请求成功',res)
      this.setData({
        commentlist: res.result
      })
    })
  },
  getThumbsup(){
    wx.cloud.callFunction({
      name:'getNotification',
      data:{
        type:'点赞'
      }
    }).then(res=>{
      console.log('点赞通知请求成功',res)
      this.setData({
        thumbsuplist: res.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamine()
    this.getComment()
    this.getThumbsup()
    this.setData({
      loadingHidden: true
    })
  },
  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab:edata.tabindex,
    })
    console.log(edata.tabindex);
    if(edata.tabindex==0){
      this.setData({
        condition:true,
        condition1:false,
        condition2:false,
      })
    }
    else if(edata.tabindex==1){
      this.setData({
        condition:false,
        condition1:true,
        condition2:false,
      })
    }
    else{
      this.setData({
        condition:false,
        condition1:false,
        condition2:true,
      })
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
})