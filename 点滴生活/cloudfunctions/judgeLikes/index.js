// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var isLikes;
  const db = cloud.database();
  await db.collection('like')
  .where({
    postid:event.id,
    userid:wxContext.OPENID
  })
  .count()
  .then(res=>{
    if(res.total==0){
      isLikes = 0;
    }
    else{
      isLikes = 1;
    }
  })
  return isLikes; 
}