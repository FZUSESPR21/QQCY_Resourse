// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  var id = event.id;
  var userPic
  await db.collection('user')
    .where({
        userid: 'oxmoK5iLdJN3LwnL9zathV1Iqvzw',
    })
    .get()
    .then(res=>{
      userPic =  res.data[0].userPic
     })
    console.log(userPic);
    return userPic;
}