var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db =require('../lib/addRegister.js');
//********************查找商品********************//
router.post('/find', function(req, res, next) {

  // console.log(req.body);
  //   console.log(db);
    var fname = req.body.goodsName;
    console.log(fname);
    db.query(function(db){
      //find为空时查找整个数据库数据
        db.collection('list').find({"goodsName":fname}).toArray(function (err, docs){
            console.log(docs);
            res.send(docs);//给前端返回结果
        });
    })
});
//******************删除商品********************//
router.post('/deletes', function(req, res, next) {

  // console.log(req.body);
  //   console.log(db);
    var fname = req.body.goodsName;
    console.log(fname);
    db.query(function(db){
        db.collection('list').deleteOne({ goodsName : fname }, function(err, result) {

          console.log("Removed the document with the field a equal to 3");
          
          res.send(result);
        });    
    })
});
//******************修改商品*******************//
router.post('/alter', function(req, res, next) {

    console.log(req.body);
    var gid = mongoose.Types.ObjectId(req.body.id);//要和传过来的数据的键值名相对应,req.body._id,错误
    console.log(gid);
    db.query(function(db){
    db.collection('list').update({ '_id' : gid }
    , { $set: { 
          "goodsName":req.body.goodsName,
          "price":req.body.price,
          "images":req.body.images
     } }, function(err, result) {
        console.log("Updated the document with the field a equal to 2");
        res.send(result);
      });  
    })
});
module.exports = router;
