// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id=event.id;
  var data;
  const db=cloud.database()
  await db.collection("diary").where({
    _id:id
  }).limit(10000).get().then(res=>{
    console.log(res.data[0])
    data=res.data[0]
  })
  return data;
}