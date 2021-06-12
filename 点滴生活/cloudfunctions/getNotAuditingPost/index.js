// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var data
  await db.collection('post')
    .where({
      state: 0,
    }).field({
      _id:true,
      userName:true,
      createTime:true,
      content:true,
      userid:true
    })
    .get()
    .then(res=>{
      data = res.data;
    })
    
    return data;
}