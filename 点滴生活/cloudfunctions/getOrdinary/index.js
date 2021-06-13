// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    //结果集
    var ordinary = new Array();
    //获取登录的openid
    await db.collection('diary')
    .orderBy('year','desc')
    .orderBy('month','desc')
    .orderBy('day','desc')
    .where({
        userid: wxContext.OPENID
    })
    .get()
    .then(res=>{
        console.log(res.data)
        ordinary = res.data
    })
    return ordinary
}