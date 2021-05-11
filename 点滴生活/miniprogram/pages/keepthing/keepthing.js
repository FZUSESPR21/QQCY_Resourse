
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    navbarData: {
      //图片路径，从数据库获取
      iconpath: "",
      //日记日期
      notedate: ""
    },
    height: app.globalData.height * 2 + 20 , // 此页面 页面内容距最顶部的距离
    inputBottom: 30,   //bottom_menu的位置
    picId:[],     //图片

    content_text:"",
    content_title:"",


    //是否显示心情
    flag: false,

    //心情图片
    moods:[
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/8.png",
        imgId: "mood8",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/7.png",
        imgId: "mood7",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/6.png",
        imgId: "mood6",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/5.png",
        imgId: "mood5",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/4.png",
        imgId: "mood4",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/3.png",
        imgId: "mood3",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/2.png",
        imgId: "mood2",
      },
      {
        imgPath: "cloud://cloud1-2g1cvw78a2d7648f.636c-cloud1-2g1cvw78a2d7648f-1305707823/mood-icon/1.png",
        imgId: "mood1",
      },
    ],

    //当天日记内容
    message:
      {
        mood:'../../images/mood1@3x.png',
        day:'08',
        week:'周四',
        year:'2021',
        month:'04',
        title:'这是一个严谨的标题',
        content:'一个不重要的日记内容',
        userid:'',
        picArrary:[]
      },

      
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar({
      animation: true,    //隐藏底部导航栏
    })

    this.upload = this.selectComponent("#uploadPic");
      this.upload.setData({
        hide:false          //hide为true表示隐藏预览
      })

      //获取当前时间
      var today = new Date();
      var todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let nav = this.selectComponent('#nav');
      nav.setData({
        ['navbarData.notedate']: todayDate,
      })

  },

  backToNoteslist(){
    wx.navigateBack();   //返回上一级
  },

  //输入标题
  inputTitle: function(e) {
    this.setData({
      flag: false,
    })
  },

  //输入框获取焦点，获取键盘高度
  inputFocus(e) {
    this.setData({
      inputBottom: e.detail.height*2 - 10,
      flag: false,
    })
  },
  
  //失去焦点，位置下移
  inputBlur(e) {
    var that = this;
    this.setData({
      content: e.detail.value,
      inputBottom: 0,
      flag: false,
    })
  },

  //点击发布
  toNoteslist: function(e) {
    console.log(this.data.picId);
    var today = new Date();
    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")
    //今天的日期
    var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    //判断今天周几
    var week = weekArray[new Date(date).getDay()]  
    
    this.setData({
      ['message.year'] : today.getFullYear(),
      ['message.month'] : today.getMonth() + 1,
      ['message.day'] : today.getDate(),
      ['message.week'] : week,
      ['message.content'] : this.data.content_text,
      ['message.title'] : this.data.title_text,
      
    })

    //传入数据库
    wx.cloud.callFunction({
      name:'addOrdinary',
      data:{
        title:this.data.title_text,
        content:this.data.content_text,
        year:today.getFullYear(),
        week:week,
        day:today.getDate(),
        month:today.getMonth() + 1,
        mood:this.data.message.mood,
        picArray:this.data.picId
      }
    }).then(res=>{
      console.log(res.result);
    })

    //弹窗提示
    wx.showToast({
      title: '发布成功！', // 标题
      icon: 'success',  // 图标类型，默认success
      duration: 1500  // 提示窗停留时间，默认1500ms
    })

    //延时
    setTimeout(function () {
        //跳转
        wx.switchTab({
        url: '../keepthing/noteslist',
        flag: false,
      })
     }, 1500) //延迟时间 这里是1.5秒
  },
  
  //文章标题发生变化
  titlechange:function(e){
    this.setData({
      title_text: e.detail.value,
    })
  },

  //文章内容发视变化
  contentchange:function(e){
    this.setData({
      content_text: e.detail.value,
    })
  },

  //选择要上传的图片
  selectImg: function(){
    this.upload.addPic();
    this.setData({
      flag: false,
    })
  },

  //上传图片
  uploadImg: async function(){
    this.upload.uploadPics().then(res=>{
      this.setData({
        picId:this.data.picId.concat(res)
      })
      this.upload.setData({
        picId:[],
      })
    })
  },

  //弹出按钮选择心情
  selectMood: function (e) {
    this.setData({
      flag: true,
      inputBottom: 320,
    })
  },

  //选中心情
  thisMood: function(e) {
    var url = e.currentTarget.dataset.url;
    let nav = this.selectComponent('#nav');
      nav.setData({
        ['navbarData.iconpath']: url,
      })
      this.setData({
        ['message.mood']: url,
      })
  },

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