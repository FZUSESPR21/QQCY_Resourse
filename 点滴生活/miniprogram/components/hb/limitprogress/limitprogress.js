// components/hb/limitprogress.js


var isFirst = true;

var isSiFirst = true;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    remain:{
      type:Number,
      value:{
      }
    },
    noticetext:{
      type:String,
      value:{

      }
    },
    percent:{
      type:Number,
      value:{

      }
    },
    progresscolor:{
      type:String,
      value:{
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    progresscolor : "#FFC8A1",
    percent : 0,
    noticetext : "还未获取数据",
    isSi: true,
    remain: 0,
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      wx.cloud.callFunction({
        name:'getLimit',
      }).then(res=>{
        if((res.result[1]/res.result[0])*100 <=50){
          this.setData({
            percent : (res.result[1]/res.result[0])*100,
            remain :(res.result[0]-res.result[1]).toFixed(2),
            progresscolor : "#33FFCC",
            noticetext : "额度还在计划之内，但也别挥霍哟~"
          })
        }
        else if((res.result[1]/res.result[0])*100<=75)
        {
          this.setData({
          percent : (res.result[1]/res.result[0])*100,
          remain :(res.result[0]-res.result[1]).toFixed(2),
          progresscolor : "#FFC8A1",
          noticetext : "额度已经过半，注意节约使用~"
        })
        }
        else if((res.result[1]/res.result[0])*100<100)
        {
          this.setData({
            percent : (res.result[1]/res.result[0])*100,
            remain :(res.result[0]-res.result[1]).toFixed(2),
            progresscolor : "#F58B7E",
            noticetext : "额度即将用完，请规划使用剩下额度~"
          })
        }
        else{
          this.setData({
            percent : (res.result[1]/res.result[0])*100,
            remain :(res.result[0]-res.result[1]).toFixed(2),
            progresscolor : "#FF0000",
            noticetext : "额度已经用完！"
          })
        }
        
      })
     },
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
