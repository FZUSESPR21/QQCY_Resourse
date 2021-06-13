const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  var userName;
  var commentCount;
  await db.collection("user")
  .where({
    userid:wxContext.OPENID,
  })
  .get()
  .then(res=>{
    userName = res.data[0].userName;
  });
  await db.collection("post").where({
    _id:event.tipId
  }).get()
  .then(res=>{
    commentCount=res.data[0].comments
  })
  commentCount=commentCount+1;
  var newData={
    comments:commentCount
  }
  await db.collection("post").where({
    _id:event.tipId
  })
  .update({
    data:newData
  })
  .then(res=>{
  })
  return await db.collection('comment').add({
    data:{
      username:userName,
      createTime:event.createTime,
      userid:wxContext.OPENID,
      content:event.content,
      postid:event.tipId,

    },
    success(res){
      console.log(res)
  },
  })
}