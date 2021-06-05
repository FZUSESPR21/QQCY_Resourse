//const { log } = require("console")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit:1,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel:0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '小日常', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20 , // 此页面 页面内容距最顶部的距离

    
      noteslist:[
        {
          mood:'',
          day:'...',
          week:'...',
          year:'...',
          month:'...',
          title:'...',
          content:'...',
          picArray:[]
        }
      ],

      notedetail:{
        mood:'',
        day:'...',
        week:'...',
        year:'...',
        month:'...',
        title:'...',
        content:'...',
        picArray:[]
      }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  toKeepthing(){
    wx.navigateTo({
      url: '../keepthing/keepthing',
    })
  },

  //跳转到详情页面
  toNotesdetail: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      ['notedetail.year'] : e.currentTarget.dataset.year,
      ['notedetail.month'] : e.currentTarget.dataset.month,
      ['notedetail.day'] : e.currentTarget.dataset.day,
      ['notedetail.mood'] : e.currentTarget.dataset.mood,
      ['notedetail.title'] : e.currentTarget.dataset.title,
      ['notedetail.content'] : e.currentTarget.dataset.content,
      ['notedetail.week'] : e.currentTarget.dataset.week,
    })

    console.log(this.data.noteslist[index])

    const{
      mood,
      day,
      week,
      year,
      month,
      title,
      content,
    } = this.data.notedetail

    console.log(year)
    wx.navigateTo({
      url: '../keepthing/notesdetails?year='+year+'&day='+day+'&month='+month+'&week='+week+'&title='+title+'&content='+content+'&mood='+mood+'&picArray='+JSON.stringify(this.data.noteslist[index].picArray)
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
    wx.cloud.callFunction({
      name:'getOrdinary',
    }).then(ordinary=>{
      console.log(ordinary.result);
      this.setData({
        noteslist:ordinary.result
      })
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
})