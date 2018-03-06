var app = require('http').createServer();
var io = require('socket.io')(app);

const PORT = 3000;
//客户端计数
var clientCount = 0;
//保存socket
var socketMap = {}
app.listen(PORT);

var bindListener = function(socket,event){
    socket.on(event,function(data){
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum - 1]){
                socketMap[socket.clientNum - 1].emit(event,data);
            }
        }else{
            if(socketMap[socket.clientNum + 1]){
                socketMap[socket.clientNum + 1].emit(event,data);
            }
        }
    })
}

io.on('connection',(socket)=>{
    clientCount = clientCount + 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if(clientCount % 2 == 1){
        socket.emit('waiting','正在匹配...');
    }else{
        if(socketMap[socket.clientNum - 1]){
            socketMap[(clientCount - 1)].emit('start');
            socket.emit('start');
        }else{
            socket.emit('leave');
        }
    }

    bindListener(socket,'init');
    bindListener(socket,'next');
    bindListener(socket,'rotate');
    bindListener(socket,'down');
    bindListener(socket,'left');
    bindListener(socket,'right');
    bindListener(socket,'fall');
    bindListener(socket,'fixed');
    bindListener(socket,'line');
    bindListener(socket,'time');
    bindListener(socket,'lose');
    bindListener(socket,'bottomLine');
    bindListener(socket,'addTailLines');

    socket.on('disconnect',()=>{
        if(socket.clientNum % 2 == 0){
            if(socketMap[socket.clientNum - 1]){
                socketMap[socket.clientNum - 1].emit('leave');
            }
            
        }else{
            if(socketMap[socket.clientNum + 1]){
                socketMap[socket.clientNum + 1].emit('leave');
            }
        }
        delete(socketMap[socket.clientNum]);
    })
})
console.log('server was listen by PORT 3000...');