// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    await db.collection('post').doc('cbddf0af60c08ed60f39e9ef769c5458').update({
        data: {
            //likes: event.newLikesNum,
            likes: 18,
        }
    })
}