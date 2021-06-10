// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command
var $ = cloud.database().command.aggregate   //定义聚合操作符

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var openid = wxContext.OPENID
  var id = event.id
  var tip
  var commentList = new Array()
  
  db.collection('post').where({
    _id:'28ee4e3e60c1cbdf213c1e356dd8c453',
    /*userid:'openid',*/
  })
  .get()
  .then(res=>{
    console.log(res.data)
    return res.data
  })
}
// 只读取了数据 还没写完