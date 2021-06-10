// pages/keepaccounts/keepaccounts.js
import * as echarts from '../../components/hb/ec-canvas/echarts';

const app = getApp()
let chart = null;
var pickid;
var pickweek;
var pickyear = "2021";
var pixelRatio1 = 750 / wx.getSystemInfoSync().windowWidth;
var yeardata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var xYeardata = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
var xWeekdata = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
var xMonthdata1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
var xMonthdata2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
var xMonthdata3 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
var xMonthdata4 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
var xdata = xYeardata
var type = 'cRecord'
var today_week;
var days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var timestamp = Date.parse(new Date())
var date = new Date(timestamp);
var nowYear = date.getFullYear().toString()
var today = new Date(timestamp);
var first = new Date(today.getFullYear(), 0, 1);
var firstWeek = first.getDay();
var nowmonth = "1";

var listdata = [];
var toYear = today.getFullYear();
if (((toYear % 4 == 0 && toYear % 100 != 0) || toYear % 400 == 0) && today.getMonth() > 1) {
  today_week = parseInt((days[today.getMonth()] + today.getDate() + 1 - 8 + firstWeek) / 7 + 1);
} else {
  today_week = parseInt((days[today.getMonth()] + today.getDate() - 8 + firstWeek) / 7 + 1);
}
var ctiptext = '总支出：'
var rtiptext = '总收入：'
var tiptext = ctiptext
var pieData = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limitIsShow:'',
    dialogShow: false,
    dialogbuttons: [{ text: '取消' }, { text: '确定' }],
    tempYearSelected: { id: "y001", name: "2021年" },
    tempMonthSelected: { id: "m001", name: "1月" },
    tempWeekSelected: { id: "w001", name: "第1周" },
    totalAccount: 0,
    avgAccount: 0,
    chartchange: true,  //图表改变判断，true为折线图，false为饼图
    imageSrc: '../../images/chartchange_pie.png',//图表切换图标的url
    yeardefaultoption: {
      id: "y001",
      name: "2021年"
    },
    yearoptions: [         //下拉框的数据
      {
        time_id: 'y002',
        time_name: '2020年'
      }, {
        time_id: 'y003',
        time_name: '2019年'
      }, {
        time_id: 'y004',
        time_name: '2018年'
      }
    ],
    monthdefaultoption: {
      id: "m001",
      name: "1月"
    },
    monthoptions: [         //下拉框的数据
      {
        time_id: 'm002',
        time_name: '2月'
      }, {
        time_id: 'm003',
        time_name: '3月'
      }, {
        time_id: 'm004',
        time_name: '4月'
      }, {
        time_id: 'm005',
        time_name: '5月'
      }, {
        time_id: 'm006',
        time_name: '6月'
      }, {
        time_id: 'm007',
        time_name: '7月'
      }, {
        time_id: 'm008',
        time_name: '8月'
      }, {
        time_id: 'm009',
        time_name: '9月'
      }, {
        time_id: 'm010',
        time_name: '10月'
      }, {
        time_id: 'm011',
        time_name: '11月'
      }, {
        time_id: 'm012',
        time_name: '12月'
      }
    ],
    weekdefaultoption: {
      id: "w001",
      name: "第1周"
    },
    weekoptions: [         //下拉框的数据
      {
        time_id: 'w002',
        time_name: '第2周'
      }, {
        time_id: 'w003',
        time_name: '第3周'
      }, {
        time_id: 'w004',
        time_name: '第4周'
      }, {
        time_id: 'w005',
        time_name: '第5周'
      }, {
        time_id: 'w006',
        time_name: '第6周'
      }, {
        time_id: 'w007',
        time_name: '第7周'
      }, {
        time_id: 'w008',
        time_name: '第8周'
      }, {
        time_id: 'w009',
        time_name: '第9周'
      }, {
        time_id: 'w010',
        time_name: '第10周'
      }, {
        time_id: 'w011',
        time_name: '第11周'
      }, {
        time_id: 'w012',
        time_name: '第12周'
      }, {
        time_id: 'w013',
        time_name: '第13周'
      }, {
        time_id: 'w014',
        time_name: '第14周'
      }, {
        time_id: 'w015',
        time_name: '第15周'
      }, {
        time_id: 'w016',
        time_name: '第16周'
      }, {
        time_id: 'w017',
        time_name: '第17周'
      }, {
        time_id: 'w018',
        time_name: '第18周'
      }, {
        time_id: 'w019',
        time_name: '第19周'
      }, {
        time_id: 'w020',
        time_name: '第20周'
      }, {
        time_id: 'w021',
        time_name: '第21周'
      }, {
        time_id: 'w022',
        time_name: '第22周'
      }, {
        time_id: 'w023',
        time_name: '第23周'
      }, {
        time_id: 'w024',
        time_name: '第24周'
      }, {
        time_id: 'w025',
        time_name: '第25周'
      }, {
        time_id: 'w026',
        time_name: '第26周'
      }, {
        time_id: 'w027',
        time_name: '第27周'
      }, {
        time_id: 'w028',
        time_name: '第28周'
      }, {
        time_id: 'w029',
        time_name: '第29周'
      }, {
        time_id: 'w030',
        time_name: '第30周'
      }, {
        time_id: 'w031',
        time_name: '第31周'
      }, {
        time_id: 'w032',
        time_name: '第32周'
      }, {
        time_id: 'w033',
        time_name: '第33周'
      }, {
        time_id: 'w034',
        time_name: '第34周'
      }, {
        time_id: 'w035',
        time_name: '第35周'
      }, {
        time_id: 'w036',
        time_name: '第36周'
      }, {
        time_id: 'w037',
        time_name: '第37周'
      }, {
        time_id: 'w038',
        time_name: '第38周'
      }, {
        time_id: 'w039',
        time_name: '第39周'
      }, {
        time_id: 'w040',
        time_name: '第40周'
      }, {
        time_id: 'w041',
        time_name: '第41周'
      }, {
        time_id: 'w042',
        time_name: '第42周'
      }, {
        time_id: 'w043',
        time_name: '第43周'
      }, {
        time_id: 'w044',
        time_name: '第44周'
      }, {
        time_id: 'w045',
        time_name: '第45周'
      }, {
        time_id: 'w046',
        time_name: '第46周'
      }, {
        time_id: 'w047',
        time_name: '第47周'
      }, {
        time_id: 'w048',
        time_name: '第48周'
      }, {
        time_id: 'w049',
        time_name: '第49周'
      }, {
        time_id: 'w050',
        time_name: '第50周'
      }, {
        time_id: 'w051',
        time_name: '第51周'
      }, {
        time_id: 'w052',
        time_name: '第52周'
      }, {
        time_id: 'w053',
        time_name: '第53周'
      }
    ],
    selected: {
      id: "y001",
      name: "2021年"
    },       //下拉框选中的项
    ec: {
      onInit: initChart
    },
    mpdefaultoption: {
      id: "mp001",
      name: "1月"
    },
    mpoptions: [
      {
        time_id: "mp002",
        time_name: "2月",
      },
      {
        time_id: "mp003",
        time_name: "3月",
      },
      {
        time_id: "mp004",
        time_name: "4月",
      },
      {
        time_id: "mp005",
        time_name: "5月",
      },
      {
        time_id: "mp006",
        time_name: "6月",
      },
      {
        time_id: "mp007",
        time_name: "7月",
      },
      {
        time_id: "mp008",
        time_name: "8月",
      },
      {
        time_id: "mp009",
        time_name: "9月",
      },
      {
        time_id: "mp010",
        time_name: "10月",
      },
      {
        time_id: "mp011",
        time_name: "11月",
      },
      {
        time_id: "mp012",
        time_name: "12月",
      },
    ],
    // 组件所需的参数
    nvabarData: {
      showCapsule: 0, //是否显示左上角返回图标   1表示显示    0表示不显示
      showEdit: 0,//是否显示左上角编辑图标   1表示显示    0表示不显示
      showcancel: 0,//是否显示左上角关闭图标   1表示显示    0表示不显示
      title: '账本', //导航栏 中间的标题
    },
    costaccountlist: [],
    slideposition: "0",//0表示此时滑块在左边，1表示在右边
    incomecolor: "",
    expendcolor: "",
    yearbackcolor: "",
    yearcolor: "",
    yearborder: "none",//默认选中年，年无边框
    monthbackcolor: "",
    monthcolor: "",
    monthborder: "",
    weekbackcolor: "",
    weekcolor: "",
    weekborder: "",
    yearselect: "block",
    monthselect: "none",
    weekselect: "none",
    listselect: "auto",
    listselectshow: "block",
    height: app.globalData.height * 2 + 20, // 此页面 页面内容距最顶部的距离
  },
  /**
   * slidebutoon  账单按钮的功能
   */
  slidebuttons(e) {
    console.log(e.detail)
    pickid = e.detail.data;
    switch (e.detail.index) {
      case 0: {
        console.log("你点击了查看详情");

        break;
      }
      case 1: {
        console.log("你点击了修改");

        break;
      }
      case 2: {
        console.log("你点击了删除");
        this.setData({
          dialogShow: true
        })
        break;
      }
    }
  },
  /**
   * 
   */
  accountedit(e) {
    console.log(e.detail + "  你触发了父组件的事件");
    wx.navigateTo({//注，无法跳转到tabbar绑定的界面
      url: '../testpage/testpage',
      success: function (res) { },
      fail: function () { },
      complete: function () { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({ //查看用户是否存在用户表
    //   name: 'searchUser',
    // }).then(res => {
    //   if(res.result==0)
    //   {
    //     wx.cloud.callFunction({
    //       name: 'addUser',
    //     }).then(res => {

    //     })
    //   }
    // })
    //-----分割线，下面是饼图相关代码
    let data = processSelected(this.data.selected, type)
    wx.cloud.callFunction({
      name: 'getPieData',
      data: {
        recordType: data.recordType,
        timeType: data.timeType,
        value: data.value,
        year: pickyear
      },
      success: res => {
        pieData = res.result.pieData
        console.log(pieData)
      },
      fail: err => {
        console.log(err)
        console.log("查找失败")
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({ duration: 300 });
  },

  getaccountlist(py) {
    wx.cloud.callFunction({
      name: 'getyearrecordlist',
      data: {
        type: type,
        year: py,
      }
    }).then(res => {
      listdata = new Array()
      console.log(res.result)
      for (var i = 0; i < res.result.length; i++) {
        listdata.push(res.result[i]);
      }
      for (var i = 0; i < listdata.length; i++) {
        for (var j = 0; j < listdata[i].accountgroup.account.length; j++) {
          listdata[i].accountgroup.account[j].slideButtons = [{
            text: '查看详情',
            src: "../../../images/view-detail.png",
            data: listdata[i].accountgroup.account[j].id
          }, {
            text: '修改',
            src: "../../../images/edit.png",
            data: listdata[i].accountgroup.account[j].id
          }, {
            text: '删除',
            src: "../../../images/delete.png",
            data: listdata[i].accountgroup.account[j].id
          }]
        }
      }
      console.log(listdata)
      this.setaccountlist(nowmonth)
    })
  },
  setaccountlist(num) {
    var accountdata = [];
    console.log(num)
    for (var i = 0; i < listdata.length; i++) {
      var k = listdata[i].accountgroup.date;
      k = k.split('月');
      if (k[0] == num) {
        accountdata.push(listdata[i]);
      }
    }
    this.setData({ costaccountlist: accountdata })
  },

  setaccountlistbyweek(num) {
    var accountdata = [];
    for (var i = 0; i < listdata.length; i++) {
      var k = listdata[i].accountgroup.week;
      if (k == num) {
        accountdata.push(listdata[i]);
      }
    }
    this.setData({ costaccountlist: accountdata })
  },
  /**
   * 
   * 删除对话框的内容
   */
  tapDialogButton(e) {
    console.log(e.detail)
    if (e.detail.index == 1) {
      console.log("删除这条账单")
      /**调用删除云函数 */
      wx.cloud.callFunction({
        name: 'deleteRecord',
        data: {
          id: pickid,
          type:type,
        },
        success: res => {
          for(var i=0;i<listdata.length;i++){
            for(var j=0;j<listdata[i].accountgroup.account.length;j++){
              if(listdata[i].accountgroup.account[j].id==pickid)
              {
                if(listdata[i].accountgroup.account.length==1)
                listdata.splice(i,1)
                else 
                {listdata[i].accountgroup.account.splice(j,1);
                  listdata[i].accountgroup.vlheight-=120;
                  listdata[i].accountgroup.onedayaccountheight-=120;
                }
                break;
              }
            }
          }
          if(this.data.weekselect=="block")
          this.setaccountlistbyweek(pickweek)
          else 
          this.setaccountlist(nowmonth)
          console.log(this.data.costaccountlist)
        },
        fail: err => {
        }
      })
    }
    /**
     * 下面设置可用额度
     */
    this.setData({
      dialogShow: false
    })
    wx.navigateTo({
      url: '../keepaccounts/none',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var date = new Date()
    pickyear = date.getFullYear();
    nowmonth = date.getMonth();
    nowmonth = nowmonth + 1;
    this.setData({
      currentmonth: { name: nowmonth + "月" },
      yearcurrent: { name: pickyear + "年" },
      monthcurrent: { name: nowmonth + "月" },
      weekcurrent: { name: "第1周" }
    });
    if (this.data.chartchange == true) {
      this.changeLineTable();
    }
    else {
      this.changePieTable();
      //这里填写饼图的数据切换
    }

    this.getaccountlist(pickyear)
    this.setaccountlist(nowmonth)

  },
  slidemove() {
    console.log("你点击了滑块", this.data.slideposition);
    if (type == 'cRecord') {
      type = 'rRecord'
    }
    else {
      type = 'cRecord'
    }//还需要重新获取数据
    if (tiptext == ctiptext) {
      tiptext = rtiptext
    }
    else {
      tiptext = ctiptext
    }

    if (this.data.chartchange == true) {
      var i = 1 + 2021 - pickyear;
      this.setData({
        selected: {
          id: 'y00' + i,
          name: pickyear,
        }
      })

      this.changeLineTable();
    }
    else {
      //这里写饼图的收入支出切换。
      //饼图根据当前的pickyear、selected、type来获取数据
      var i = 1 + 2021 - pickyear;
      this.setData({
        selected: {
          id: 'y00' + i,
          name: pickyear,
        }
      })
      this.changePieTable();
    }


    var px1 = 106 / pixelRatio1;
    if (this.data.slideposition == 0) {
      this.animation.translate(px1).step()
      this.setData({ animation: this.animation.export() })
      this.setData({ slideposition: 1, incomecolor: "#FFFFFF", expendcolor: "#909090" })
      var date = new Date()
      pickyear = date.getFullYear();
      nowmonth = date.getMonth();
      nowmonth = nowmonth + 1;
      this.setData({
        yearbackcolor: "#FFC8A1",
        yearcolor: "#FFFFFF",
        yearborder: "none",
        monthbackcolor: "#FFFFFF",
        monthcolor: "#909090",
        monthborder: "solid",
        weekbackcolor: "#FFFFFF",
        weekcolor: "#909090",
        weekborder: "solid",
        yearselect: "block",
        monthselect: "none",
        weekselect: "none",
        listselectshow: "block",
        listselect: "auto",
        listcurrentmonth: { name: nowmonth + "月" },
        yearcurrent: { name: pickyear + "年" },
        monthcurrent: { name: nowmonth + "月" },
        weekcurrent: { name: "第1周" }
      })
      this.getaccountlist(pickyear)
      this.setaccountlist(nowmonth)
    }
    else {
      this.animation.translate(0).step()
      this.setData({ animation: this.animation.export() })
      this.setData({ slideposition: 0, incomecolor: "#909090", expendcolor: "#FFFFFF" })
      var date = new Date()
      pickyear = date.getFullYear();
      nowmonth = date.getMonth();
      nowmonth = nowmonth + 1;
      this.setData({
        yearbackcolor: "#FFC8A1",
        yearcolor: "#FFFFFF",
        yearborder: "none",
        monthbackcolor: "#FFFFFF",
        monthcolor: "#909090",
        monthborder: "solid",
        weekbackcolor: "#FFFFFF",
        weekcolor: "#909090",
        weekborder: "solid",
        yearselect: "block",
        monthselect: "none",
        weekselect: "none",
        listselectshow: "block",
        listselect: "auto",
        listcurrentmonth: { name: nowmonth + "月" },
        yearcurrent: { name: pickyear + "年" },
        monthcurrent: { name: nowmonth + "月" },
        weekcurrent: { name: "第1周" }
      })
      this.getaccountlist(pickyear)
      this.setaccountlist(nowmonth)
    }
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

  },
  makeaccount() {
    wx.cloud.callFunction({
      name: 'haveUserProfile',
    })
      .then(haveProfile => {
        if (!haveProfile.result) {
          wx.showModal({
            title: '提示',
            content: '您还未授权，请到个人中心点击头像授权',
            cancelColor: 'cancelColor',
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../mycenter/mycenter',
                })
              } else if (res.cancel) {
                console.log("取消");
              }
            }
          })
        } else {
          wx.navigateTo({
            url: '../makeaccount/makeaccount',
          })
        }
      })

  },
  yearselect(e) {
    console.log("你选择了逐年展示")
    this.setData({
      yearbackcolor: "#FFC8A1",
      yearcolor: "#FFFFFF",
      yearborder: "none",
      monthbackcolor: "#FFFFFF",
      monthcolor: "#909090",
      monthborder: "solid",
      weekbackcolor: "#FFFFFF",
      weekcolor: "#909090",
      weekborder: "solid",
      yearselect: "block",
      monthselect: "none",
      weekselect: "none",
      listselectshow: "block",
      listselect: "auto"
    })
    //切换展示模式时的默认年份
    var i;
    var date = new Date();
    pickyear = date.getFullYear();
    i = 2021 + 1 - pickyear;
    //折线图切换数据
    if (this.data.chartchange) {
      this.setData({
        selected: { name: pickyear + "年", id: "y00" + i }
      })
      this.changeLineTable()
    }

    //饼图改变数据
    if (!this.data.chartchange) {
      this.setData({
        selected: { name: pickyear + "年", id: "y00" + i }
      })
      this.changePieTable()
    }
  },

  monthselect(e) {
    console.log("你选择了逐月展示")
    this.setData({
      yearbackcolor: "#FFFFFF",
      yearcolor: "#909090",
      yearborder: "solid",
      monthbackcolor: "#FFC8A1",
      monthcolor: "#FFFFFF",
      monthborder: "none",
      weekbackcolor: "#FFFFFF",
      weekcolor: "#909090",
      weekborder: "solid",
      monthselect: "block",
      yearselect: "none",
      weekselect: "none",
      listselectshow: "none",
      listselect: "none"
    })
    //设置切换月份展示时的默认月份
    var date = new Date()
    nowmonth = date.getMonth();
    //折线图改变数据
    if (this.data.chartchange) {
      this.setData({
        selected: { id: "m00" + nowmonth, name: parseInt(nowmonth + 1) + "月" }
      })
      nowmonth = nowmonth + 1;
      this.changeLineTable()
    }

    //饼图改变数据
    if (!this.data.chartchange) {
      this.setData({
        selected: { id: "m00" + nowmonth, name: parseInt(nowmonth + 1) + "月" }
      })
      this.changePieTable()
    }
  },

  getWeeks: function () {
    var days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var today = new Date(this.data.date);
    var first = new Date(today.getFullYear(), 0, 1);
    var firstWeek = first.getDay();
    var today_week;
    var toYear = today.getFullYear();
    if (((toYear % 4 == 0 && toYear % 100 != 0) || toYear % 400 == 0) && today.getMonth() > 1) {
      today_week = parseInt((days[today.getMonth()] + today.getDate() + 1 - 8 + firstWeek) / 7 + 1);
      console.log("闰年");
    } else {
      today_week = parseInt((days[today.getMonth()] + today.getDate() - 8 + firstWeek) / 7 + 1);
    }
  },

  weekselect(e) {
    console.log("你选择了逐周展示")
    this.setData({
      yearbackcolor: "#FFFFFF",
      yearcolor: "#909090",
      yearborder: "solid",
      monthbackcolor: "#FFFFFF",
      monthcolor: "#909090",
      monthborder: "solid",
      weekbackcolor: "#FFC8A1",
      weekcolor: "#FFFFFF",
      weekborder: "none",
      weekselect: "block",
      monthselect: "none",
      yearselect: "none",
      listselectshow: "none",
      listselect: "none"
    })
    //折线图改变数据
    if (this.data.chartchange) {
      this.setData({
        selected: this.data.tempWeekSelected
      })
      this.changeLineTable()
    }

    //饼图改变数据
    if (!this.data.chartchange) {
      this.setData({
        selected: this.data.tempWeekSelected
      })
      this.changePieTable()
    }
  },
  /**
   * 图表切换点击事件处理
   */
  handleChartChange(e) {
    let imagePie = '../../images/chartchange_pie.png';
    let imageLine = '../../images/chartchange_line.png';
    let optionPie = getOptionPie();
    let optionLine = getOption();
    let option;
    let { chartchange } = this.data;
    option = chartchange ? optionPie : optionLine;
    this.setData({
      chartchange: !chartchange,
      imageSrc: chartchange ? imageLine : imagePie
    })
    if (!this.data.chartchange) {
      this.changePieTable()
    } else {
      chart.setOption(option);
      this.changeLineTable();
    }
  },

  /**
   * 自定义事件bindchange的处理，select组件的数据传到这里
   */
  change(e) {
    console.log(e)
    this.setData({
      selected: { ...e.detail }
    })
    console.log({//弹出对话框
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
    })

    if (this.data.chartchange == true) {
      this.changeLineTable();
    }
    else {
      //这里填写饼图的数据切换
      this.changePieTable();
    }
    //储存最近选择的年月周
    let data = processSelected(this.data.selected, type);
    if (data.timeType == 'year') {
      pickyear = data.value
      this.setData({
        tempYearSelected: this.data.selected
      })
    } else if (data.timeType == 'month') {
      this.setData({
        tempMonthSelected: this.data.selected
      })
    } else {
      this.setData({
        tempWeekSelected: this.data.selected
      })
    }
  },
  changeLineTable() {
    if (this.data.selected.id.substr(0, 1) == "w")//选择以某一周查看账单
    {
      console.log(pickyear + "年 " + this.data.selected.name);//pickyear表示选择的是哪一年
      var s = this.data.selected.name
      var num = s.replace(/[^0-9]/ig, "")
      num = num - 1
      pickweek=num;
      console.log(num)
      this.setaccountlistbyweek(num)
      wx.cloud.callFunction({
        name: 'getWeekRecord',
        data: {
          type: type,
          Year: pickyear,
          Week: num
        }
      }).then(res => {
        xdata = xWeekdata
        yeardata = res.result
        var total = 0
        var avg = 0
        for (var k = 0; k < yeardata.length; k++) {
          total += yeardata[k]
        }
        avg = (total / yeardata.length).toFixed(2)
        total = total.toFixed(2)
        this.setData({
          totalAccount: total,
          avgAccount: avg,
        })
        chart.setOption(getOption())
        console.log(yeardata)
      })
    }

    if (this.data.selected.id.substr(0, 1) == "m")//选择以某一月
    {
      this.setData({ listcurrentmonth: { name: this.data.selected.name } })
      console.log(pickyear + "年 " + this.data.selected.name);
      var s = this.data.selected.name
      var num = s.replace(/[^0-9]/ig, "")
      console.log(num)
      this.setaccountlist(num);
      wx.cloud.callFunction({
        name: 'getMonthRecord',
        data: {
          type: type,
          Year: pickyear,
          Month: num
        }
      }).then(res => {
        if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) {
          xdata = xMonthdata1
        }
        else if (num == 4 || num == 6 || num == 9 || num == 11) {
          xdata = xMonthdata2
        }
        else {
          if ((nowYear % 4 == 0 && nowYear % 100 != 0) || nowYear % 400 == 0) {
            xdata = xMonthdata3
          }
          else {
            xdata = xMonthdata4
          }
        }
        yeardata = res.result
        var total = 0
        var avg = 0
        for (var k = 0; k < yeardata.length; k++) {
          total += yeardata[k]
        }
        avg = (total / yeardata.length).toFixed(2)
        total = total.toFixed(2)
        this.setData({
          totalAccount: total,
          avgAccount: avg,
        })
        chart.setOption(getOption())
        console.log(yeardata)
      })
    }

    if (this.data.selected.id.substr(0, 1) == "y")//选择以某一年
    {
      console.log(this.data.selected.name);
      pickyear = this.data.selected.name.substr(0, 4);
      this.getaccountlist(pickyear);
      this.setData({ listcurrentmonth: { name: nowmonth + "月" } })
      wx.cloud.callFunction({
        name: 'getYearRecord',
        data: {
          type: type,
          Year: pickyear
        }
      }).then(res => {
        xdata = xYeardata
        yeardata = res.result
        var total = 0
        var avg = 0
        for (var k = 0; k < yeardata.length; k++) {
          total += yeardata[k]
        }
        avg = (total / yeardata.length).toFixed(2)
        total = total.toFixed(2)
        this.setData({
          totalAccount: total,
          avgAccount: avg,
        })
        chart.setOption(getOption())
        console.log(yeardata)
      })
    }
  },

  changePieTable() {
    let data = processSelected(this.data.selected, type)
    wx.cloud.callFunction({
      name: 'getPieData',
      data: {
        recordType: data.recordType,
        timeType: data.timeType,
        value: data.value,
        year: pickyear
      },
      success: res => {
        // console.log(res.result)
        pieData = res.result.pieData
        chart.setOption(getOptionPie());
        if (pieData[0].name == '无') {
          wx.showToast({
            title: '没有记录',
            icon: 'none',
            duration: 1000
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  mpchange(e) {
    this.setData({
      selected: { ...e.detail }
    })
    console.log({//弹出对话框
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
    })
    console.log(pickyear + "年 " + this.data.selected.name);
    nowmonth = this.data.selected.name;
    nowmonth = nowmonth.substr(0, 1);
    this.setaccountlist(nowmonth);
  },
  /**
  * 设置账单数据函数
  */

  /**
   * 点击其它地方时收起下拉框，绑定mainblock的点击事件
   */
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  }
})


function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  let option = getOption()

  chart.setOption(option)

  return chart


}

function getOption() {
  return {
    tooltip: { //点击tip弹窗样式更改
      trigger: 'axis',
      backgroundColor: "white",
      color: "white",
      borderWidth: "1", //边框宽度设置1
      borderColor: "white", //设置边框颜色
      textStyle: {
        color: "black" //设置文字颜色
      },
      formatter: function (params) {
        var tip = "";
        if (params != null && params.length > 0) {
          for (var i = 0; i < params.length; i++) {
            tip += tiptext + params[i].value;
          }
        }
        return tip;
      }
    },
    grid: {
      y: 10,
      y2: 20,
      x: 10,
      x2: 10,
    },
    xAxis: {
      show: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#d3d7d4'
        }
      },
      axisLabel: {
        interval: 0,
      },
      type: 'category',
      data: xdata
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      axisLine: {       //y轴
        show: false

      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: '#d3d7d4'
        }
      },
      type: 'value'
    },
    series: [{
      itemStyle: {

        normal: {

          color: '#d71345',

          lineStyle: {
            width: 3.5,
            color: '#f05b72'
          }

        }

      },
      areaStyle: {//背景渐变色设置
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{

            offset: 0,
            color: '#f05b72'
          }, {
            offset: .34,
            color: '#f58f98'
          }, {
            offset: 1,
            color: '#feeeed'
          }])

        }
      },
      symbolSize: 10,
      data: yeardata,
      type: 'line',
      smooth: true
    }],
    dataZoom: [{
      type: 'slider',
      show: false,
      start: 0,
      end: 70,
      handleSize: 2
    },
    {
      type: 'inside',
      start: 0,
      end: 50
    }
    ],
  }
}

function getOptionPie() {
  let option = {
    color: ['#F6494C', '#FEAE3F', '#4E26B6', '#6BDE8F', '#457EF9'],
    xAxis: {
      show: false
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      textStyle: {
        fontSize: 28 / pixelRatio1,
        fontFamily: 'Bahnschrift'
      },
      top: '11%',
      right: '7%',
      orient: 'vertical',
      icon: 'circle',
      formatter: function (name) {
        // 获取legend显示内容
        let data = option.series[0].data;
        let total = 0;
        let tarValue = 0;
        for (let i = 0, l = data.length; i < l; i++) {
          total += data[i].value;
          if (data[i].name == name) {
            tarValue = data[i].value;
          }
        }
        let p = (tarValue / total * 100).toFixed(1);
        return name + ' ' + p + '%';
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['43%', '80%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderWidth: 0,
          borderColor: '#ffffff',
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: '',
            formatter: '{c}\n(元)',
            color: '#EE7364',
            fontFamily: 'Bahnschrift'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          scaleSize: 8
        },
        labelLine: {
          show: false
        },
        data: pieData
        // [
        //     {
        //       value: 969.564, 
        //       name: '搜索',
        //       itemStyle: {
        //         color: {
        //           type: 'linear',
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [{
        //               offset: 0, color: '#F6494C' // 0% 处的颜色
        //           }, {
        //               offset: 0.6, color: '#FE9451' // 100% 处的颜色
        //           }],
        //           global: false // 缺省为 false
        //         }
        //       }},
        //     {
        //       value: 735, 
        //       name: '直接',
        //       itemStyle: {
        //         color: {
        //           type: 'linear',
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [{
        //               offset: 0, color: '#FFFF20' // 0% 处的颜色
        //           }, {
        //               offset: 0.6, color: '#FCBF4C' // 100% 处的颜色
        //           }],
        //           global: false // 缺省为 false
        //         }
        //       }
        //     },
        //     {
        //       value: 580, 
        //       name: '邮件',
        //       itemStyle: {
        //         color: {
        //           type: 'linear',
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [{
        //               offset: 0, color: '#4E26B6' // 0% 处的颜色
        //           }, {
        //               offset: 0.6, color: '#566EE8' // 100% 处的颜色
        //           }],
        //           global: false // 缺省为 false
        //         }
        //       }
        //     },
        //     {
        //       value: 484, 
        //       name: '联告',
        //       itemStyle: {
        //         color: {
        //           type: 'linear',
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [{
        //               offset: 0, color: '#6BDE8F' // 0% 处的颜色
        //           }, {
        //               offset: 0.6, color: '#58EBD4' // 100% 处的颜色
        //           }],
        //           global: false // 缺省为 false
        //         }
        //       }
        //     },
        //     {
        //       value: 300, 
        //       name: '视频',
        //       itemStyle: {
        //         color: {
        //           type: 'linear',
        //           x: 0,
        //           y: 0,
        //           x2: 0,
        //           y2: 1,
        //           colorStops: [{
        //               offset: 0, color: '#457EF9' // 0% 处的颜色
        //           }, {
        //               offset: 0.6, color: '#53A2F2' // 100% 处的颜色
        //           }],
        //           global: false // 缺省为 false
        //         }
        //       }
        //     }
        // ]
      }
    ]
  }
  return option;
}

function processSelected(selected, type) {
  let data = {}
  let length = selected.name.length
  data.recordType = type
  if (selected.id.substr(0, 1) == 'y') {
    data.timeType = 'year'
    data.value = selected.name.substr(0, 4)
  }
  else if (selected.id.substr(0, 1) == 'm') {
    data.timeType = 'month'
    data.value = selected.name.substr(0, length - 1)
  }
  else {
    data.timeType = 'week'
    data.value = parseInt(selected.name.substr(1, length - 1)) - 1
  }
  return data
}