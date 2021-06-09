// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
const _ = db.command
// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // var openid = 'test01'
  var notification 
  // type为通知类型
  var type = event.type
  var openid = wxContext.OPENID

  await db.collection('notify')
  .where({
    type:type,  
    userid:openid,
  })
  .orderBy('time','desc')
  .get()
  .then(res=>{
    notification = res.data
  })
  return notification
}