// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var userPic;
  var userName;
  await db.collection("user")
  .where({
    userid:wxContext.OPENID,
  })
  .get()
  .then(res=>{
    userName = res.data[0].userName;
    userPic = res.data[0].userPic;
  })
  return await db.collection('post').add({
    data:{
      userPic:userPic,
      userName:userName,
      createTime:event.createTime,
      userid:wxContext.OPENID,
      content:event.text,
      picArray:event.picArray,
      comments:0,
      likes:0,
      state:0,
      recommend:0,
      sortTime:event.sortTime
    }
  })
}