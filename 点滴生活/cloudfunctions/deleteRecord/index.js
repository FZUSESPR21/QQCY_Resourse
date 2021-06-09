// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id=event.id;
  var type=event.type;
  const db = cloud.database()
  db.collection(type).doc(id).remove()
  return true
}