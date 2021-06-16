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
    db.collection('notify')
    .add({
      data:{
        content:"您发布的内容“"+res.data[0].content.slice(0,30)+"..."+"”被评论了"+"\n"+userName+":“"+event.content+"”",
        userid:res.data[0].userid,
        mark:0,
        title:"您发布的社区文章被评论了",
        type:'评论',
        time:event.createTime,
      }
    })
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