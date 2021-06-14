// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var postdata;
  await db.collection('post')
  .where({
    state:1
  })
  .orderBy('recommend','desc')
  .orderBy('createTime', 'desc')
  .orderBy('likes','desc')
  .skip(event.length)
  .limit(5)
  .get()
  .then(res=>{
    postdata = res.data;
  })
  for(var i=0;i<postdata.length;i++){
    await db.collection('like')
    .where({
      postid:postdata[i]._id,
      userid:wxContext.OPENID
    })
    .count()
    .then(res=>{
      if(res.total==0){
        postdata[i]['haveThumbup'] = 0;
      }
      else{
        postdata[i]['haveThumbup'] = 1;
      }
    })
  }
  return postdata 
}