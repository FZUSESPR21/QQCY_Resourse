// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const colId="createTime";
var asc = function (x, y) {
  return (x[colId]>y[colId]) ? 1 : -1
}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database();
  var recordlist=new Array();
  await db.collection("cRecord").where({
    userid:wxContext.OPENID
  }).limit(10000).get().then(res=>{
    res.data.sort(asc);
    var outcomelist=new Array();
    outcomelist.type="支出"
    for(var i=0;i<res.data.length;i++){
      outcomelist.push({
        "时间":res.data[i].createTime,
        "金额":res.data[i].number,
        "类别":res.data[i].selectType,
        "备注":res.data[i].remark
      })
    }
    recordlist.push(outcomelist)
  })
  await db.collection("rRecord").where({
    userid:wxContext.OPENID
  }).limit(10000).get().then(res1=>{
    res1.data.sort(asc);
    var incomelist=new Array()
    incomelist.type="收入"
  for(var i=0;i<res1.data.length;i++){
    incomelist.push({
      "时间":res1.data[i].createTime,
      "金额":res1.data[i].number,
      "类别":res1.data[i].selectType,
      "备注":res1.data[i].remark});
  }
  recordlist.push(incomelist)
  })
  return recordlist;
}