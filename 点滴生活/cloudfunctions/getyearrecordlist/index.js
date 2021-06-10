// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const $ = db.command.aggregate;

var colId = "createTime"
var desc = function (x, y) {
  return (x.colId< y.colId) ? 1 : -1
}
//对json进行升序排序函数
var asc = function (x, y) {
  return (x[colId]>y[colId]) ? 1 : -1
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var year = event.year;
  var type = event.type;
  var data = new Array();
  console.log(wxContext.OPENID)
  await db.collection(type).where($.and([
    {
      userid: wxContext.OPENID,
    },
    {
      createTime: db.RegExp({
        regexp: year + '-.*',
        options: 'i',
      })
    }
  ])).limit(10000).get()
    .then(res => {
      res.data.sort(asc);
      console.log(res.data)
      var num = 0;
      var data_index = 0;
        var flag=0;
      for (var i = 0; i < res.data.length; i++) {//完成按日期分组的功能
        var createTime = res.data[i].createTime;
        var weeks=res.data[i].weeks;
        var time = new Array();
        flag=0;
        time = createTime.split('-');
        createTime = parseFloat(time[1]) + "月" + parseFloat(time[2]) + "日";
        if (data.length == 0) {
          data.push({
            accountgroup: {
              date: createTime,
              week:weeks,
              vlheight: -20,
              onedayaccountheight: 60
            }
          })
        }
        for(var k=0;k<data.length;k++)
        {
          if(data[k].accountgroup.date == createTime) 
          flag=1;
        }
        if(flag==0) data.push({
            accountgroup: {
              date: createTime,
              week:weeks,
              vlheight: -20,
              onedayaccountheight: 60
            }})
      }
      console.log(data);
      console.log("*****")
      data_index = 0
      
      for (var i = 0; i < res.data.length; i++) {
        var createTime = res.data[i].createTime;
        var time = new Array();
        time = createTime.split('-');
        createTime = parseFloat(time[1]) + "月" + parseFloat(time[2]) + "日";

        if (createTime == data[data_index].accountgroup.date) {
          if (data[data_index].accountgroup.hasOwnProperty('account')) {
            data[data_index].accountgroup.account.push({
              type: res.data[i].typeid,
              num: res.data[i].number,
              remark: res.data[i].remark,
              id:res.data[i]._id,
              selecttype: res.data[i].selectType
            })
            var a = 120;
            data[data_index].accountgroup.vlheight += parseInt(a);
            data[data_index].accountgroup.onedayaccountheight += parseInt(a)
          }
          else {
            data[data_index].accountgroup.account =
              [{
                id:res.data[i]._id,
                type: res.data[i].typeid,
                num: res.data[i].number,
                remark: res.data[i].remark,
                selecttype: res.data[i].selectType
              }]
            var a = 120;
            data[data_index].accountgroup.vlheight += parseInt(a);
            data[data_index].accountgroup.onedayaccountheight += parseInt(a)
            console.log(data[data_index].accountgroup.date)
            console.log(data[data_index].accountgroup.vlheight)
          }
        }
        else {
          data_index++;
          if (data[data_index].accountgroup.hasOwnProperty('account')) {
            data[data_index].accountgroup.account.push({
              id:res.data[i]._id,
              type: res.data[i].typeid,
              num: res.data[i].number,
              remark: res.data[i].remark,
              selecttype: res.data[i].selectType
            })
            var a = 120;
            data[data_index].accountgroup.vlheight += parseInt(a);
            data[data_index].accountgroup.onedayaccountheight += parseInt(a)
          }
          else {
            data[data_index].accountgroup.account =
              [{
                id:res.data[i]._id,
                type: res.data[i].typeid,
                num: res.data[i].number,
                remark: res.data[i].remark,
                selecttype: res.data[i].selectType
              }]
            var a = 120;
            data[data_index].accountgroup.vlheight += parseInt(a);
            data[data_index].accountgroup.onedayaccountheight += parseInt(a)
          }
        }
      }
    })

  data.sort(desc)
  console.log(data);
  return data;
}