// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var haveProfie = false
  await db.collection('user')
  .where({
     userid:wxContext.OPENID 
  })
  .count()
  .then(res=>{
    console.log(res.total)
    if(res.total>=1){
      haveProfie=true
    }
  })
  if(!haveProfie){
    await db.collection('user').add({
      data:{
        userDuration:0,
        userlimit:[0,0],//这个l的大小写需要注意一下
        userTotalDays:0, 
        userid:wxContext.OPENID,
        userName:event.userName,
        userPic:event.userPic,
        userTotalRecord:0,
        permission:0,
        lastTimeAddRecord:"2000/0/0"
      }
    })
  }
  return haveProfie
}