// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    console.log(event.id)
    const db = cloud.database();
    await db.collection('diary')
    .where({
        _id:event.id
    })
    .remove()
    .then(res=>{
        console.log(res.stats.removed)
    })
}