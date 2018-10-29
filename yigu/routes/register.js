var express = require('express');
var router = express.Router();
var db =require('../lib/addRegister.js');//引入操作数据库的文件，自定义模块使用相对路径（addRget即拿到的是addRegister.js文件下的query方法）
/* GET users listing. */
router.post('/FindRegister', function(req, res, next) {
    console.log(req.body);
    console.log(db);
    let userName =  req.body.username;
    db.query(function(db){
        db.collection('user').find({
         "username":userName//此处键值需要加引号
        }).toArray(function (err, docs){
            // assert.equal(err, null);//后端报错ReferenceError: assert is not defined，将此句代码删除掉后正常
            console.log("Found the following records");//打印查找状态的提示
            console.log(docs);//打印结果
            res.send(docs);//给前端返回结果
        });
    })
  
});
//************注册，将数据加入数据库***********//
router.post('/AddRegister', function(req, res, next) {

    db.query(function(db){
        db.collection('user').insertMany([req.body], function(err, result) {
            console.log("Inserted 1 document into the collection");
            res.send(result);
        });
    })
  
});

module.exports = router;




// Status pending 是什么意思？
// 定义：信号产生和传递之间的时间间隔内，称此信号是未决的；简单的说就是：一个已经产生的信号，但是还没有传递给任何进程，此时该信号的状态就称为未决状态。

//此处检查ajax发送请求传过来的数据为空，原因：ajax请求为get，后端得不到数据，改为post请求得到数据
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var router = express.Router();

// router.post('/AddRegister', function(req, res,next){
//     console.log(req.body);
//   res.send('respond with a resource');
// });

// module.exports = router;
