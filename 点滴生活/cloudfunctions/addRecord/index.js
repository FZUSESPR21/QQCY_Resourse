// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var type;
  if(event.switchType==1){
    type = 'cRecord';
  }else{
    type = 'rRecord'
  }
  var num = parseFloat(event.number);

  var days = [0,31,59,90,120,151,181,212,243,273,304,334];
  var today = new Date(event.createTime);
  var first = new Date(today.getFullYear(),0,1);
  var firstWeek = first.getDay();
  var today_week;
  var toYear = today.getFullYear();
  if(((toYear%4==0&&toYear%100!=0)||toYear%400==0)&&today.getMonth()>1){
    today_week = parseInt((days[today.getMonth()]+today.getDate()+1-8+firstWeek)/7+1);
  }else{
    today_week = parseInt((days[today.getMonth()]+today.getDate()-8+firstWeek)/7+1);
  }
  var week = today.getDay();
  var newDate = new Date();
  if(type==='cRecord'&&today.getMonth()==newDate.getMonth()&&today.getFullYear()==newDate.getFullYear()){
     db.collection('user')
            .where({
              userid:wxContext.OPENID
            })
            .update({
              data:{
                "userlimit.1":_.inc(num),
                'userTotalRecord':_.inc(1)
              }
            })
  }else{
      db.collection('user')
      .where({
        userid:wxContext.OPENID
      })
      .update({
        data:{
          'userTotalRecord':_.inc(1)
        }
      })
  }

  await db.collection('user')
  .where({
    userid:wxContext.OPENID,
  })
  .get()
  .then(res=>{
    var oldDate = new Date(res.data[0].lastTimeAddRecord);
    var newDate = new Date(event.time);
    if(oldDate.toLocaleDateString()==newDate.toLocaleDateString()){

    }else{
      oldDate.setDate(oldDate.getDate()+1);
      if(oldDate.toLocaleDateString()==newDate.toLocaleDateString()){
        if((oldDate.getMonth()!=newDate.getMonth())){
          if((type=='cRecord')){
            console.log("连续记账，新的一月，每月已消费额度归0，再加上此次记账的数额");
            db.collection('user')
            .where({
              userid:wxContext.OPENID
            })
            .update({
              data:{
                "userlimit.1":num,
                userDuration:_.inc(1),
                userTotalDays:_.inc(1),
                lastTimeAddRecord:event.time,
              }
            })
          }else{
            console.log("连续记账，新的一月，每月已消费额度归0");
            db.collection('user')
            .where({
              userid:wxContext.OPENID
            })
            .update({
              data:{
                "userlimit.1":0,
                userDuration:_.inc(1),
                userTotalDays:_.inc(1),
                lastTimeAddRecord:event.time,
              }
            })
          }
        }else{
          console.log("不是新的一月,但是连续记账");
          db.collection('user')
          .where({
            userid:wxContext.OPENID
          })
            .update({
              data:{
                userDuration:_.inc(1),
                userTotalDays:_.inc(1),
                lastTimeAddRecord:event.time,
              }
            })
        }
      }else{
        //00
        if((oldDate.getMonth()!=newDate.getMonth())){
          if((type=='cRecord')){
            console.log("不是连续记账且是新的一月，每月已消费额度归0，再加上此次记账的数额");
            db.collection('user')
            .where({
              userid:wxContext.OPENID
            })
            .update({
              data:{
                "userlimit.1":num,
                userDuration:1,
                userTotalDays:_.inc(1),
                lastTimeAddRecord:event.time,
              }
            })
          }else{
            console.log("不是连续记账且新的一月，每月已消费额度归0");
            db.collection('user')
            .where({
              userid:wxContext.OPENID
            })
            .update({
              data:{
                "userlimit.1":0,
                userDuration:1,
                userTotalDays:_.inc(1),
                lastTimeAddRecord:event.time,
              }
            })
          }
        }else{
          console.log("不是连续记账也不是新的一月,连续记账记录变成1");
          db.collection('user')
          .where({
            userid:wxContext.OPENID
          })
          .update({
            data:{
              userDuration:1,
              userTotalDays:_.inc(1),
              lastTimeAddRecord:event.time,
            }
          })
        }
      }
    }
  })


  return await db.collection(type).add({
    data:{
      number:num,
      createTime:event.createTime,
      remark:event.remark,
      typeid:event.typeid,
      userid:wxContext.OPENID,
      selectType:event.selectType,
      weeks:today_week,
      week:week,
      selectNoteId:event.selectNoteId,
    }
  })
}