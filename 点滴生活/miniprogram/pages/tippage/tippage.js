// pages/tippage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit:0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel:0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '贴士详情', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20 , // 此页面 页面内容距最顶部的距离
    headSrc:"../../images/tt3x.png",
    tipPublisherMessage:{//小贴士发布者信息
      headUrl:'../../images/tt3x.png',//头像url
      userName:"",//用户名
      publishTime:""//发布时间
    },
      tipId:'cbddf0af60c366ba0fa85909225fcc8e',
      tipContent:'',//小贴士文字内容
      tipImgUrls:[],//小贴士图像url数组
      tipNumData:{//小贴士数字数组
      likeNum:0,
      commentNum:0,
    },
    userInfo:{
      nickName:"用户昵称",  //用户昵称
      avatarUrl:"../../images/tt3x.png",  //用户头像
    },
    commentList: [//小贴士评论列表
      {
        content: '',
        createTime: '',
        username:'',
        userPic:'',   //评论者头像
      },   
    ],

    commentInputText:"",//文字框输入内容
    isLike:false,//是否点赞
    isMark:false,//是否收藏
    inputMarBot: false,//设置底部输入框与输入法的距离
    hasUserInfo:false
  },

  LikeTip:function (e) {
    //判断用户有没有点赞文章
    wx.cloud.callFunction({
      name: 'judgeLikes',
      data: {
        id: this.data.tipId,  //文章id
      }
    })
    .then(isLikes=>{
      console.log('点过没？')
      console.log(isLikes)
      if(isLikes.result == 0){
        console.log(this.data.isLike);
        this.setData({
          isLike:false,      //未点赞
        })
      }
      else {
        this.setData({
          isLike:true,      //未点赞
        })
      }
    })
   //未点赞过
   if(this.data.isLike == false) {
      wx.cloud.callFunction({
        name: 'changeLikes',
        data: {
          id: this.data.tipId,  //文章id
          likeNum: this.data.tipNumData.likeNum+1,
          state: true
        }
      }).then(res=>{
        this.setData({
          ['tipNumData.likeNum']: this.data.tipNumData.likeNum+1,   //点赞数＋1
          isLike: true,
        })
      })
    }
    else {
      wx.cloud.callFunction({
        name: 'changeLikes',
        data: {
          id: this.data.tipId,  //文章id
          likeNum: this.data.tipNumData.likeNum-1,
          state: false
        }
      }).then(res=>{
        this.setData({
          ['tipNumData.likeNum']: this.data.tipNumData.likeNum-1,   //点赞数-1
          isLike: false,
        })
      })
    }
  },
  MarkTip:function (e) {
    this.setData({
      isMark:true
    })
  },

  postComment:function (e) {//发布评论函数
    if(this.data.commentInputText!="")
    {
      let _this=this;
      var d=new Date();
      let createTime="";
      createTime+=d.getFullYear()+'-';
      createTime+=(d.getMonth()+1)+'-';
      createTime+=(d.getDate())+' ';
      createTime+=(d.getHours())+':';
      createTime+=(d.getMinutes())+':';
      createTime+=(d.getSeconds());
      createTime=createTime.toString();//转化时间戳
      console.log(createTime)
      wx.cloud.callFunction({
        name:'addComment',
        data : {
          tipId:_this.data.tipId,   //post_id由小贴士列表传送
          content:_this.data.commentInputText,
          createTime:createTime
        }
      }).then(res=>{
        console.log(res.result);
        this.getTipsDetail(this.data.tipId)
        wx.showToast({
          title: '评论发布成功',
          icon: 'none',//icon
          duration: 1500 //停留时间
      })
        _this.setData({
          commentInputText:""
        })
      })
    }
    else{
      wx.showToast({
        title: '评论为空',
        icon: 'none',//icon
        duration: 1500 //停留时间
    })
    }  
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
  onShow: function () {//获取用户头像
    //目前阶段getUser云函数目前只搜索openid为test01的用户
    wx.cloud.callFunction({
      name: 'getUser',
    }).then(rest=>{
      console.log(rest);
      if(rest.result!=null){
        this.setData({
          ['userInfo.avatarUrl']:rest.result.userPic,
          ['userInfo.nickName']:rest.result.userName,
          hasUserInfo:true
        })
      }
    })
    
  },

 getTipsDetail:function (post_id) {
   let that=this;
  wx.cloud.callFunction({
    name:'getTipsDetail',
     data : {
       id: post_id  //post_id由小贴士列表传送
     }
  }).then( tip =>{
    that.setData({
      tipContent: tip.result[0].content,
      tipImgUrls: tip.result[0].picArray,
      ['tipNumData.likeNum']: tip.result[0].likes,
      ['tipNumData.commentNum']: tip.result[0].comments,
      ['tipPublisherMessage.headUrl']: tip.result[0].userPic,
      ['tipPublisherMessage.userName']: tip.result[0].userName,
      ['tipPublisherMessage.publishTime']: tip.result[0].createTime,
    })
  })

  //读取评论列表
  wx.cloud.callFunction({
    name:'getComment',
    data : {
      id: post_id   //post_id由小贴士列表传送
    }
  }).then( commentDetail => {
    console.log( commentDetail.result );
    that.setData({
      commentList: commentDetail.result,
    })
  })
 },

onLoad(option){
  let that=this;
  wx.getSetting({
    success: function(res){
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function(res) {
           that.setData({
             userInfo:res.userInfo
           })
          }
        })
      }
    }
  })
    const post_id = option.id;
    this.setData({
      tipId: post_id,
    })
    //从数据库获取内容
    this.getTipsDetail(post_id)

    //判断用户有没有点赞文章
    wx.cloud.callFunction({
      name: 'judgeLikes',
      data: {
        id: this.data.tipId,  //文章id
      }
    })
    .then(isLikes=>{
      console.log('点过没？')
      console.log(isLikes)
      if(isLikes.result == 0){
        console.log(this.data.isLike);
        this.setData({
          isLike:false,      //未点赞
        })
      }
      else {
        this.setData({
          isLike:true,      //未点赞
        })
      }
    })
  },
  settingMbShow:function (params) {
    this.setData({
      inputMarBot:true
    })
  },
  settingMbNoShow:function (params) {
    this.setData({
      inputMarBot:false
    })
  },
  bindTextAreaBlur:function(e)//输入框获取内容函数
  {
    this.setData({
      commentInputText:e.detail.value
    })
    // console.log(this.data.commentInputText)
  },

  backToBefore:function(e) {
    wx.navigateBack();   //返回上一级
  },
  previewImage: function (e) {  //图片预览
		var current=e.target.dataset.src;
		wx.previewImage({
		  	current: current, // 当前显示图片的http链接
		  	urls: this.data.tipImgUrls // 需要预览的图片http链接列表
		})
	}  
})