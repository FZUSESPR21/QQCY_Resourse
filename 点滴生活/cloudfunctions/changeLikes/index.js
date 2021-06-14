// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    //修改点赞数
    await db.collection('post').doc(event.id).update({
        data: {
            likes: event.likeNum,
        }
    })

    //修改Like表
    if(event.state == true){
        await db.collection('like').add({
            data:{
                postid: event.id,
                userid: wxContext.OPENID
            }
        })
    }
    else{
        await db.collection('like')
        .where({
            postid: event.id,
            userid: wxContext.OPENID
        })
        .remove()
    }
}