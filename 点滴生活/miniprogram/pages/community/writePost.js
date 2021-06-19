// miniprogram/pages/community/writePost.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit: 0, //是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel: 0, //是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20, // 此页面 页面内容距最顶部的距离
    picBox:[],//图片上传暂存地址，预览需要使用
    picId:[],//图片上传后从云端数据中返回的id值，用于一会存入数据库中
    text:"",
  },

  setText:function(e){
    this.setData({
      text:e.detail.value
    })
  },
  returnToC:function(){
    wx.navigateBack({
      delta: 0,
    })
  },

  uploadPost:function(){
    if(this.data.text.replace(/\s*/g,"")!=""){
        wx.cloud.callFunction({
          name:'msgesc',
          data:{
            text:this.data.text,
          }
        }).then(res=>{
          if(res.result.errCode==0){
            var createTime;
            var date = new Date();
            createTime = date.toLocaleString("zh", { hour12: false,year:'numeric',month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit'});
            createTime = createTime.replace(',',' ');
            createTime = createTime.replaceAll('/','-');
            var sortTime = date.toLocaleDateString();
            wx.showLoading({
              title: '正在上传',
              mask:true
            })
            let promiseArr = [];
            for (let index = 0; index < this.data.picBox.length; index++) {
              promiseArr.push(new Promise((reslove,reject)=>{
                let item = this.data.picBox[index];
                let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
                wx.cloud.uploadFile({
                  cloudPath: new Date().getTime() + index +suffix, // 上传至云端的路径
                  filePath: item,
                  success: res=>{
                    this.setData({
                      picId:this.data.picId.concat(res.fileID)
                    })
                    reslove();
                  },
                  fail: res=>{
                    wx.hideLoading();
                    wx.showToast({
                      title: "上传失败",
                    })
                  }
                })
              }))
            }
            Promise.all(promiseArr).then(res=>{
              console.log(this.data.picId)
              wx.hideLoading();
              wx.showToast({
                title: "上传成功",
              })
    
              //发布文章之后的函数
              wx.cloud.callFunction({
                name:"addPost",
                data:{
                  text:this.data.text,
                  picArray:this.data.picId,
                  createTime:createTime,
                  sortTime:sortTime
                }
              }).then(res=>{
                console.log(res);
                console.log(createTime);
              })
              wx.showToast({
                title: '等待人工审核！', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
              setTimeout(function (){
                    //跳转
                    wx.navigateBack({
                      delta: 0,
                    })
                }, 1500) //延迟时间 这里是1.5秒
              })
          }else{
            wx.showToast({
              title: '含有违规内容，请重新编辑',
              icon:'none'
            })
            this.setData({
              text:""
            })
          }
        })
    }else{
      wx.showToast({
        title: '还未输入内容',
        icon:'error'
      })
    }
    
  },  

  addPic:function(e){
    var Box = this.data.picBox;//创建用于添加暂存图片的数组
    var n = 9;//设置默认可以上传的图片数
    var context = this;
    if(9>Box.length > 0){
      n = n-Box.length;//可以上传的图片数等于总共可以上传的减去已添加的
    }else{
      n=0;
    }
    wx.chooseImage({
      count: n,
      success:function(res){
        var tempFilePaths = res.tempFilePaths;
        if(Box.length == 0){
          Box = tempFilePaths;
        }else if(9 > Box.length){
          Box = Box.concat(tempFilePaths);
        }
        context.setData({
          picBox:Box
        });
      }   
    })
  },

  preview:function(e){
    var url = e.currentTarget.dataset.src;
    wx.previewImage({
      current:url,
      urls: this.data.picBox,
    })
  },

  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let picBox = this.data.picBox;
    picBox.splice(index, 1)
    that.setData({
      picBox: picBox
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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