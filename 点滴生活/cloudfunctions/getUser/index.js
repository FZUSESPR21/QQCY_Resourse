// 云函数入口文件
const cloud = require('wx-server-sdk')


// 根据用户openid查询数据库，返回用户id等基本信息
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid = wxContext.OPENID
  //wxContext.OPENID
  var rest
  // var sum
  await db.collection('user')
  .where({
    userid:openid 
  })
  .get()
  .then(res=>{
    rest = res.data[0]
  })
  //获取记账总笔数
  // await db.collection('cRecord')
  // .where({
  //   userid: openid //测试用，后面userid的值要改成openid
  // })
  // .count()
  // .then(res=>{
  //   sum = res.total
  // })
  return rest
}