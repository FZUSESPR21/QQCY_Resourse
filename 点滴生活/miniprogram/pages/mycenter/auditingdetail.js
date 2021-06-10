// miniprogram/pages/mycenter/auditingdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit:0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel:0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '妙招详情界面', //导航栏 中间的标题
    },
     //文章标题
     note_title:'...',
     //文章内容
     note_content:'...',
 
     pic:[]
  },
  returnback:function(){
    wx.navigateBack();
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
    const{ id } = options;
      console.log(id);
      wx.cloud.callFunction({
        name: 'getPostDetail',
        data: {
          id: id,
        }
      }).then(res => {
        console.log(res.result)
        var picArray = res.result[0].picArray
        if(typeof(picArray)!=undefined){
          this.setData({
            pic:picArray,
          })
        }
        this.setData({
          note_title:res.result[0].userName,
          note_content:res.result[0].content,
        })
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