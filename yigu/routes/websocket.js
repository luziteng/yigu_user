function socket() {
    var app = require('express')();
    var server = require('http').createServer(app);
    var io = require('socket.io')(server);
    io.on('connection', function(socket) {
        console.log(socket.id);
        //发送socket信息的逻辑写在这里
        /* … */
        //监听
        //socket.on();
        //发送socket.emit
        //      setInterval(()=>{
        //          socket.emit('getServerMessage',parseInt(Math.random()*100));//后端发送的，要与前端的监听的函数名相匹配
        //      },1000)
        socket.on("sendMessageToServer", function(data) {
            //公聊
            io.sockets.emit("sendMessageToAllClient", data)
            //私聊
            //io.sockets.sockets[socketid].emit
        })
    });
    server.listen(3423);
}

module.exports = {
    socket
}