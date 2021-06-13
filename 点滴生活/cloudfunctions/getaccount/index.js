// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  var id=event.id;
  var type=event.type;
  const db=cloud.database();
  var data;
  await db.collection(type).where(
    {
      _id: id,
    }
  ).limit(10000).get()
    .then(res => {
      console.log(res.data)
      data=res.data;
    })
  return data;
}