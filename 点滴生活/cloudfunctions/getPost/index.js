// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // var openid = 'test01'
  var chosen 
  // state为1表示文章已入选, 0， 2表示未入选
  var state = event.state
  var openid = wxContext.OPENID
  if(state==='2'||state==='0'){
    await db.collection('post')
    .where({
      state:_.or(_.eq(0), _.eq(2)),
      userid:openid,
    })
    .get()
    .then(res=>{
      chosen = res.data
    })
    return chosen
  }
  await db.collection('post')
  .where({
    state:1,  
    userid:openid,
  })
  .get()
  .then(res=>{
    chosen = res.data
  })
  return chosen
}