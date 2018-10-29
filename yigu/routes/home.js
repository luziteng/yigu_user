var express = require('express');
var router = express.Router();
var db =require('../lib/addRegister.js');
/* GET users listing. */
router.get('/UseHome', function(req, res, next) {

  console.log(req.body);
    console.log(db);
    var users = req.body.username;
    var pwd =req.body.pwd;
    let userName =  req.body.username;
    db.query(function(db){
      //find为空时查找整个数据库数据
        db.collection('list').find({}).toArray(function (err, docs){
            console.log(docs);
            res.send(docs);//给前端返回结果
        });
    })
});

module.exports = router;
