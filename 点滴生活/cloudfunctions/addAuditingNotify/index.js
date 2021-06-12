// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var content=event.content;
  var time=event.createTime;
  var title="审核通知";
  var userid=event.userid;
  var mark="0";
  var type="审核信息";
  return await db.collection('notify').add({
    data:{
      content:content,
      mark:mark,
      time:time,
      title:title,
      type:type,
      userid:userid
    }
  })
}