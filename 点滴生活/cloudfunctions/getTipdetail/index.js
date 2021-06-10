// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var openid = wxContext.OPENID
  var id = event.id
  var tip
  var comment
  db.collection('post').where({
    _id:id,
    userid:openid,
  })
  .get()
  .then(res=>{
    tip = res.data
  })

  db.collection('comment').where({
    postid:id,
    userid:openid,
  })
  .get()
  .then(res=>{
    comment = res.data
  })

  return detail
}
// 只读取了数据 还没写完