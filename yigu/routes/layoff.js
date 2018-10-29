var express = require('express');
var router = express.Router();
var db =require('../lib/addRegister.js');
/* GET users listing. */
router.get('/findName', function(req, res, next) {
    db.query(function(db){
      //find为空时查找整个数据库数据
        db.collection('user').find({}).toArray(function (err, docs){
            console.log(docs);
            res.send(docs);//给前端返回结果
        });
    })  
  
});
router.post('/delete', function(req, res, next) {

  // console.log(req.body);
  //   console.log(db);
     var fname = req.body.username;
    console.log(fname);
    db.query(function(db){
        db.collection('user').deleteOne({username:fname }, function(err, result) {

          console.log("Removed the document with the field a equal to 3");
          
          res.send(result);
        });    
    })
});
module.exports = router;
