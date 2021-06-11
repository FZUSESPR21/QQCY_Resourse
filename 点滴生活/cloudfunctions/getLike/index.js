// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    //结果集
    var likeNum;
    //获取登录的openid
    await db.collection('post')
    .where({
        //_id: event._id,
        _id: 'cbddf0af60c08ed60f39e9ef769c5458',
    })
    .get()
    .then(res=>{
        console.log(res.data[0].likes);
        likeNum = res.data[0].likes;
    })
    return likeNum;
}