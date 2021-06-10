// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('post')
  .where({
    _id:event.id
  })
  .update({
    data:{
      "likes":_.inc(1)
    }
    
  })
  return db.collection("like")
  .add({
    data:{
      userid:wxContext.OPENID,
      postid:event.id
    }
  }).then(res=>{
    console.log(res);
  })
}