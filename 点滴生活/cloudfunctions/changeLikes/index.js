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
}