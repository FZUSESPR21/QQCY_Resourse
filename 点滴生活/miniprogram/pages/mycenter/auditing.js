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
    nowIndex:0,
    nowPostId:'',
    deleteDialogShow: false,
    auditingDialogShow: false,
    dialogbuttons: [{ text: '取消' }, { text: '确定' }],
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
      }
    ]
  },
  tapDeleteDialog(e){
    console.log(this.data.nowPostId)
    if(e.detail.index == 1)
    {
      wx.cloud.callFunction({
        name: 'deletNotAuditingPost',
        data:{
          _id: this.data.nowPostId,
        },
        success: res => {
            console.log('成功了')
            this.getNotAuditingPost()
        },
        fail: err => {
          console.log("失败了")
        }
      })
    }

    this.setData({
      deleteDialogShow:false,
    })
  },
  tapAuditingDialog(e){
    console.log(this.data.nowPostId)
    if(e.detail.index == 1)
    {
      wx.cloud.callFunction({
        name: 'passAudit',
        data:{
          _id: this.data.nowPostId,
        },
        success: res => {
            console.log('成功了')
            this.getNotAuditingPost()
        },
        fail: err => {
          console.log("失败了")
        }
      })
    }
    
    this.setData({
      auditingDialogShow:false,
    })
  },
  returnback:function(){
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNotAuditingPost();
},

getNotAuditingPost:function(){
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
  this.setData({
    nowIndex:index,
    nowPostId:this.data.posts[index]._id
  })
  var id;
  if(e.detail.index==0)
  {
    id=this.data.posts[index]._id;
    wx.navigateTo({
      url: '../mycenter/auditingdetail?id='+id
    })
    console.log("跳转详细文章内容")
  }
  else if(e.detail.index==1)
  {
    this.setData({
      auditingDialogShow:true
    })
  }
  else if(e.detail.index==2){
    this.setData({
      deleteDialogShow:true,
    })
    console.log("删除该妙招")
  }
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