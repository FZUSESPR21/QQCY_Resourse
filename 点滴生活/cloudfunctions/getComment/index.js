// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  var id = event.id;
  var commentList = new Array();

  await db.collection('comment')
    .where({
        postid: id,
    })
    .get()
    .then(res=>{
        console.log(res.data)
        commentList =  res.data
     })
     console.log( commentList);
     return  commentList;
}