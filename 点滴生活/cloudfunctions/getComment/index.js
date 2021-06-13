// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  var id = event.id;
  var commentList = new Array ()
  var commentDetail = new Array();
  var userPic = new Array();
    
 
  await db.collection('comment')
    .where({
        postid: id,
    })
    .get()
    .then(res=>{
        commentList =  res.data
     })
     console.log(commentList);

     for( var i= 0; i < commentList.length; i++ ){
      await db.collection('user')
      .where({
          userid: commentList[i].userid,
      })
      .get()
      .then(res=>{
        userPic[i] =  res.data[0].userPic
       })
     }
     for( var i= 0; i < commentList.length; i++ ){
      commentDetail[i] = {
        content :commentList[i].content,
        createTime:commentList[i].createTime,
        username :commentList[i].username,
        userPic: userPic[i],
       }

     }
     console.log(commentDetail);
     return commentDetail;
    
}