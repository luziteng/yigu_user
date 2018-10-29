var express = require('express');
var router = express.Router();
var db =require('../lib/addRegister.js');
//**************匹配已经注册的用户**********//
router.post('/FindLogin', function(req, res, next) {
    console.log(req.body);
    console.log(db);
    let userName =  req.body.username;
    db.query(function(db){
        db.collection('user').find({
         "username":userName//此处键值需要加引号
        }).toArray(function (err, docs){
            res.send(docs);//给前端返回结果
        });
    })
});
//***********账户密码验证*******************//
router.post('/UseLogin', function(req, res, next){
    console.log(req.body);
    console.log(db);
    var users = req.body.username;
    var pwd =req.body.pwd;
    let userName =  req.body.username;
    db.query(function(db){
        //无法查找到前端传过来的两个值，当查询到username，数据库中存在时就返回了整个数组，不再管password
        db.collection('user').find({"username":users},{"password":pwd}).toArray(function (err, docs){
            console.log(docs);
            res.send(docs);//给前端返回结果
        });
    })
});

module.exports = router;