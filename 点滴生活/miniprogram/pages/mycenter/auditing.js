// miniprogram/pages/makeaccount/makeaccount.js
const app = getApp()
const db = wx.cloud.database();
var pixelRatio1 = 750 / wx.getSystemInfoSync().windowWidth;   
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
    slideAuditing: true,
    slideposition:"0",//0表示此时滑块在左边，1表示在右边
    incomecolor:"",
    expendcolor:"",
    nowUserid:'',
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
    var createTime;
    var date = new Date();
    createTime = date.toLocaleString('zh', { hour12: false,year:'numeric',month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit'});
    createTime = createTime.replace(',',' ');
    createTime = createTime.replaceAll('/','-');
    var content='您的内容为“'+this.data.posts[this.data.nowIndex].content+'”的妙招未通过审核！被管理员删除，请重新撰写！';
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
            wx.cloud.callFunction({
              name: 'addAuditingNotify',
              data:{
                "content": content,
                "createTime":createTime,
                "userid":this.data.nowUserid
              },
            })
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
    var createTime;
    var date = new Date();
    createTime = date.toLocaleString('zh', { hour12: false,year:'numeric',month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit'});
    createTime = createTime.replace(',',' ');
    createTime = createTime.replaceAll('/','-');
    var content='您的内容为“'+this.data.posts[this.data.nowIndex].content+'”的妙招通过审核！';
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
            wx.cloud.callFunction({
              name: 'addAuditingNotify',
              data:{
                "content": content,
                "createTime":createTime,
                "userid":this.data.nowUserid
              },
            })
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
slidemove(){
  console.log("你点击了滑块",this.data.slideposition);
  var px1 = 126 / pixelRatio1;
  if(this.data.slideposition==0){
  this.animation.translate(px1).step()
  this.setData({animation: this.animation.export()})
  this.setData({slideAuditing: false,slideposition:1,incomecolor:"#FFFFFF",expendcolor:"#909090"})
}
  else{
    this.animation.translate(0).step()
    this.setData({animation: this.animation.export()})
    this.setData({slideAuditing: true,slideposition:0,incomecolor:"#909090",expendcolor:"#FFFFFF"})
  }
},
slideButtonTap(e) {
  
  var index = e.currentTarget.dataset.index;
  this.setData({
    nowIndex:index,
    nowPostId:this.data.posts[index]._id,
    nowUserid:this.data.posts[index].userid
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
    this.animation = wx.createAnimation({ duration: 300 });

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