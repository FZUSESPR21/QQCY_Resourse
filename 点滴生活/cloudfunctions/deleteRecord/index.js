// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var id = event.id;
  var type = event.type;
  var num;
  var date;
  console.log(type)
  console.log(id)

  if (type == "cRecord") {
    //取消支出 所以减预算使用度
    await db.collection(type).where(
      {
        _id: id,
      }
    ).limit(10000).get()
      .then(res => {
        console.log(res.data)
        num = res.data[0].number;
        date=res.data[0].createTime;
      })
    var day=new Date();
    var nowmonth=day.getMonth();
    nowmonth+=1;
    var nowyear=day.getFullYear();
    var getmonth=date[0].split('-');
    if(getmonth[1]==nowmonth&&nowyear==getmonth[0]){
    var num1 = 0 - num;
    var limit= parseFloat(num1)
    await db.collection('user')
  .where({
    userid:wxContext.OPENID
  })
  .update({
    data:{
      "userlimit.1":_.inc(limit),
    }
  })
    }
  }
  db.collection(type).doc(id).remove()
  return true
}