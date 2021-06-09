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
    tipContent:"",//小贴士文字内容
    tipImgUrls:[],//小贴士图像url数组
    tipNumData:{//小贴士数字数组
      likeNum:0,
      commentNum:0,
    },
    commentList:[//小贴士评论列表
      {
        commenterHead:'../../images/tt3x.png',//评论者头像
        commenterName:"用户1",//评论者用户名
        commentCreateTime:"2000.10.16.10.31",//评论发布时间
        commentContent:"哈喽朋友们",//评论内容
      },
      {
        commenterHead:'../../images/tt3x.png',//评论者头像
        commenterName:"用户1",//评论者用户名
        commentCreateTime:"2000.10.16.10.31",//评论发布时间
        commentContent:"哈喽朋友们",//评论内容
      },
      {
        commenterHead:'../../images/tt3x.png',//评论者头像
        commenterName:"用户1",//评论者用户名
        commentCreateTime:"2000.10.16.10.31",//评论发布时间
        commentContent:"哈喽朋友们",//评论内容
      },
      {
        commenterHead:'../../images/tt3x.png',//评论者头像
        commenterName:"用户1",//评论者用户名
        commentCreateTime:"2000.10.16.10.31",//评论发布时间
        commentContent:"哈喽朋友们",//评论内容
      },
    ],
    commentInputText:"",//文字框输入内容
    isLike:false,//是否点赞
    isMark:false//是否收藏
  },
  LikeTip:function (e) {
    this.setData({
      isLike:true
    })
  },
  MarkTip:function (e) {
    this.setData({
      isMark:true
    })
  },
  postComment:function (e) {
    
  },
  onLoad(option){
  },
  bindTextAreaBlur:function(e)
  {
    this.setData({
      commentInputText:e.detail.value
    })
    console.log(this.data.commentInputText)
  },
})