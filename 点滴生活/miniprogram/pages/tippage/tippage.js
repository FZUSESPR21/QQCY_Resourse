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
      tipId:'1',
      tipContent:'',//小贴士文字内容
      tipImgUrls:[],//小贴士图像url数组
      tipNumData:{//小贴士数字数组
      likeNum:0,
      commentNum:0,
    },
    commenterHead: [],   //评论者头像
    commentList: [//小贴士评论列表
      {
        _id: '',
        content: '',
        createTime: '',
        postid: '',
        userid:'',
        username:'',
      },
      // {
      //   /*commenterHead:'../../images/tt3x.png',//评论者头像
      //   commenterName:"用户1",//评论者用户名
      //   commentCreateTime:"2000.10.16.10.31",//评论发布时间
      //   commentContent:"哈喽朋友们",//评论内容*/
      // },
      // {
      //   /*commenterHead:'../../images/tt3x.png',//评论者头像
      //   commenterName:"用户1",//评论者用户名
      //   commentCreateTime:"2000.10.16.10.31",//评论发布时间
      //   commentContent:"哈喽朋友们",//评论内容*/
      // },
      // {
      //   /*commenterHead:'../../images/tt3x.png',//评论者头像
      //   commenterName:"用户1",//评论者用户名
      //   commentCreateTime:"2000.10.16.10.31",//评论发布时间
      //   commentContent:"哈喽朋友们",//评论内容*/
      // },
    ],
    commentInputText:"",//文字框输入内容
    isLike:false,//是否点赞
    isMark:false//是否收藏
  },
  LikeTip:function (e) {
    //未点赞过
   // if(this.data.isLike == false) {
      wx.cloud.callFunction({
        name: 'changeLikes',
        data: {
          id: this.data.tipId,  //文章id
          likeNum: this.data.likeNum+1,
        }
      }).then(res=>{
        this.setData({
          likeNum: this.data.likeNum+1,   //点赞数＋1
          isLike:true,      //点赞过了
        })
      })
    //}
    // else {
    //   wx.cloud.callFunction({
    //     name: 'changeLikes',
    //     data: {
    //       id: this.data.tipId,  //文章id
    //       likeNum: this.data.likeNum-1,
    //     }
    //   }).then(res=>{
    //     this.setData({
    //       likeNum: this.data.likeNum-1,   //点赞数-1
    //       isLike:false,      //未点赞
    //     })
    //   })
    // }
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

  onLoad(option){
    const post_id = option.id;
    this.setData({
      tipContent: post_id,
    })
    //从数据库获取内容
    wx.cloud.callFunction({
      name:'getTipsDetail',
       data : {
         id: post_id  //post_id由小贴士列表传送
       }
    }).then( tip =>{
      this.setData({
        tipId: post_id,
        tipContent: tip.result[0].content,
        tipImgUrls: tip.result[0].picArray,
        ['tipNumData.likeNum']: tip.result[0].likes,
        ['tipNumData.commentNum']: tip.result[0].comments,
        ['tipPublisherMessage.headUrl']: tip.result[0].userPic,
        ['tipPublisherMessage.userName']: tip.result[0].userName,
        ['tipPublisherMessage.publishTime']: tip.result[0].createTime,
      })
      console.log(tip.result[0].content)
    })

    //读取评论列表
    wx.cloud.callFunction({
      name:'getComment',
      data : {
        id: post_id   //post_id由小贴士列表传送
      }
    }).then(res=>{
      console.log(res.result);
      this.setData({
        commentList: commentList.result,
      })
    })
    for( var i = 0 ; i<commentListlength ; i++){
      wx.cloud.callFunction({
        name:'getCommentUser',
        data : {
          id: ['commentList[i].userid']   //post_id由小贴士列表传送
        }
      }).then(res=>{
        console.log(res.result);
        this.setData({
          commenterHead: res.result[0],
        })
      })
    }
    
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
  }
})