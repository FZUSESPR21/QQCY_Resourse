// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const _ = db.command
var $ = cloud.database().command.aggregate   //定义聚合操作符

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  post_id = event.id
  var commentList = new Array()

  db.collection('comment').aggregate()
  .lookup({
    from: 'user',
    let: {
      order_book: '$userid',
      order_quantity: '$userid'
    },
    pipeline: $.pipeline()
      .match(_.expr($.and([
        $.eq(['$userid', '$$userid']),
        $.eq(['$postid', 'post_id'])
      ])))
      .project({
  
      })
      .done(),
    as: 'commentList',
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
  return commentList
















 /* db.collection("comment").aggregate()
  .match({
    postid: post_id
  })
    .lookup({
    from:"user",
    localField: 'userid',
    foreignField: 'userid',
    as: 'uapproval'
    })
    .replaceRoot({     
      newRoot: $.mergeObjects([$.arrayElemAt(['$uapproval', 0]), '$$ROOT'])
    })
    .project({
    //project把指定的字段传递给下一个流水线，指定的字段可以是某个已经存在的字段，也可以是计算出来的新字段
      uapproval: 0
    })
    .end({
      success:function(res){
        commentList = res;
      },
      fail(error) {
        return error;
      }
      })*/
}