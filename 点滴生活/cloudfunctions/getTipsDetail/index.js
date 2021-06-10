// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  
  var openid = wxContext.OPENID;
  var id = event.id;
  var tip = new Array();

  await db.collection('post')
    .where({
        _id: id,
    })
    .get()
    .then(res=>{
        console.log(res.data)
        tip =  res.data
     })
     console.log(tip);
     return tip;
}