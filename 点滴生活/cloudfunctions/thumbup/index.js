// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var res1;
  await db.collection('like')
  .where({
    postid:event.id,
    userid:wxContext.OPENID
  })
  .count()
  .then(res=>{
    res1 = res.total;
  })
  console.log(res1);
  if(res1==0){
    if(event.haveThumbup==1){
      await db.collection('post')
      .where({
        _id:event.id
      })
      .update({
        data:{
          "likes":_.inc(1)
        }
      })
      await db.collection('notify')
      .add({
        data:{
          content:'您发布的内容“'+event.postContent+'”被点赞了',
          mark:0,
          time:event.createTime,
          title:'您发布的社区文章被点赞了',
          type:'点赞',
          userid:event.authorId
        }
      })
      return await db.collection("like")
      .add({
        data:{
          userid:wxContext.OPENID,
          postid:event.id
        }
      })
    }
  }else{
    if(event.haveThumbup==0){
      
      await db.collection('post')
      .where({
        _id:event.id
      })
      .update({
        data:{
          "likes":_.inc(-1)
        }
      })
      return await db.collection("like")
      .where({
        userid:wxContext.OPENID,
        postid:event.id
      })
      .remove()
    }
  }
  
}