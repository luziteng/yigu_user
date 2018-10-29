const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// 连接端口
const url = 'mongodb://localhost:27017';
 
//连接的数据库名
const dbName = 'yigu';
 
// 使用connect方法连接到服务器
// 封装
function query(callback){
    MongoClient.connect(url, function(err, client){
      // assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      callback(db);
      client.close();
})
}
//自定义模块配合require和module使用
module.exports ={
    query
}