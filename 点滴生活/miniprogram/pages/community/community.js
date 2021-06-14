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
    day:"",
    month:"",
    weeks:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],
    week:0,
    likeSrc:["../../images/agree.png","../../images/agree-active.png"],
    posts:[
      {
        'focus': 'https://www.duoguyu.com/dist/flip/flipImg-1.jpg'
      },
    ],
    currentGird:0,
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
    console.log(index);
    this.setData({
      currentGird:index
    })
    if(index == this.data.posts.length-2){
      wx.cloud.callFunction({
        name:'getAllPost',
        data:{
          length:this.data.posts.length
        }
      }).then(res=>{
        this.setData({
          posts:this.data.posts.concat(res.result)
        })
      })
    }
  },

  thumbup:function(e){
    var index = e.currentTarget.dataset.index;
    //需要设置一个人只能点一次
    var up = "posts["+parseInt(index)+"].haveThumbup"
    var likes = "posts["+parseInt(index)+"].likes"
    if(this.data.posts[index].haveThumbup == 1){
      this.setData({
        [up]:0,
        [likes]:this.data.posts[index].likes-1
      })
      console.log(this.data.posts[index].haveThumbup);
    }else{
      this.setData({
        [up]:1,
        [likes]:this.data.posts[index].likes+1
      })
      console.log(this.data.posts[index].haveThumbup);
    }
    //给通知表加入通知信息
    var createTime;
    var date = new Date();
    createTime = date.toLocaleString('zh', { hour12: false,year:'numeric',month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit'});
    createTime = createTime.replace(',',' ');
    createTime = createTime.replaceAll('/','-');    
    wx.cloud.callFunction({
      name:'thumbup',
      data:{
        id:this.data.posts[index]._id,
        haveThumbup:this.data.posts[index].haveThumbup,
        authorId:this.data.posts[index].userid,
        postContent:this.data.posts[index].content,
        createTime:createTime
      }
    }).then(res1=>{
      console.log(res1);
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    console.log(date.getFullYear().toString());
    var year = date.getFullYear().toString() + '.';
    var eMonth = (date.getMonth()<9)?"0"+(date.getMonth()+1).toString():(date.getMonth()+1).toString();
    this.setData({
      day:date.getDate(),
      week:date.getDay(),
      month:year+eMonth,
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
    wx.cloud.callFunction({
      name:'getAllPost',
      data:{
        length:0
      }
    }).then(res=>{
      this.setData({
         posts:res.result
     })

     console.log(this.data.posts);
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