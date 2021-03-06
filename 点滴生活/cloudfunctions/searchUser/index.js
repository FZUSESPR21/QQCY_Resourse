// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var data=0
  await db.collection("user")
  .where({
    userid:wxContext.OPENID,
  })
  .get()
  .then(res=>{
    if(res.data.length!=0)
    {
      data=1
    }
    else{
      data=0
    }
  })
  return data
}