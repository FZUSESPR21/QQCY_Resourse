// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id=event._id;
  return await db.collection("post")
  .where({
    _id:id
  })
  .update({
    data:{
      "state":0
    }
  })
}