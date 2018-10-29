var express = require('express');
var router = express.Router();

var multer = require('multer');
var db =require('../lib/addRegister.js');
 var a="";
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')//destination 是用来确定上传的文件应该存储在哪个文件夹中。
  },
 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");

        //给图片加上时间戳格式防止重名名
        //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
// console.log(file);
console.log(file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
// a=file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1];
    }
 
})
var upload = multer({ storage: storage });
router.post('/uploads', upload.single('photo'), function (req, res, next) {
    // console.log(res);
    next();
}, function (req, res, next) {
  console.log(req.file.path);
  // url=req.file.path;// 存入数据库的路径变为"public\\images\\photo-1540724530783.jpg"，所以需要截取。
   var url =  req.file.path.slice(14);

    console.log(url)
  //将其发回客户端
  res.json({
    code : 1,
    data : url
  });
  res.end();
});
//***************增加商品*************************//
router.post('/Addgoods', function(req, res, next) {

    db.query(function(db){
        db.collection('list').insertMany([req.body], function(err, result) {
            console.log("Inserted 1 document into the collection");
            res.send(result);
        });
    })
  
});

module.exports = router;