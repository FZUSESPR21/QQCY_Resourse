// pages/keepthing/notesdetails.js
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

    //文章标题
    note_title:'...',
    //文章内容
    note_content:'...',

    pic:[]
    
    

  },

  preview:function(e){
    var url = e.currentTarget.dataset.src;
    wx.previewImage({
      current:url,
      urls: this.data.pic,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //获取数据
    const{ mood,day,week,year,month,title,content,picArray } = options;
    console.log(picArray);
    if(typeof(picArray)!=undefined){
      this.setData({
        pic:JSON.parse(picArray)
      })
    }
    this.setData({
      note_content : content,   //内容
      note_title: title    ,     //标题
    })
    console.log(this.data.pic);
    var date = year+"-"+month+"-"+day
    //日期和心情赋值
    let nav = this.selectComponent('#nav');
      nav.setData({
        ['navbarData.notedate']: date,
        ['navbarData.iconpath']:mood
      })
    
    console.log(mood)


  },
  backToNoteslist(){
    wx.navigateBack();   //返回上一级
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
})