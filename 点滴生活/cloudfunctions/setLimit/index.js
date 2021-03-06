// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var limit = parseInt(event.limit)
  return await db.collection("user")
  .where({
    userid:wxContext.OPENID//后期要改为openid才可对应到相应的用户
  })
  .update({
    data:{
      "userlimit.0":limit
    }
  })
} 