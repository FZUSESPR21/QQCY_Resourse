// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var haveProfile = false;
  await db.collection('user')
  .where({
    userid:wxContext.OPENID,
  })
  .count()
  .then(res=>{
    if(res.total>=1){
      haveProfile = true;
    }else{
      haveProfile = false;
    }
  })
  return haveProfile;
}