// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("获取的id：")
  console.log(event._id)
  await db.collection('post')
  .where({
      _id:event._id
  })
  .remove()
  .then(res=>{
      console.log("删除的记录的数量：")
      console.log(res.stats.removed)
  })
}