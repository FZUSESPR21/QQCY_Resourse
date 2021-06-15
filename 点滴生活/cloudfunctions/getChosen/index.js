// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //var openid = 'test01'
  var chosen = '100'
  var openid = wxContext.OPENID
  await db.collection('post')
  .where({
    state:"1",  //state为1表示文章已入选
    userid:openid,
  })
  .get()
  .then(res=>{
    chosen = res.data
  })
  return chosen
}