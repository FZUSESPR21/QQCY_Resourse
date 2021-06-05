// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var data;
  
  await db.collection("user")
  .where({
    userid:wxContext.OPENID
  })
  .get()
  .then(res=>{
    data = res.data[0].permission
  })
  console.log("返回结果为："+data)
  return data;
}