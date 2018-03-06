var Remote = function(socket){
    //游戏对象
    var game;
    //绑定按钮事件
    var bindEvents = function(){
        socket.on('init',(data)=>{
            console.log(data);
            start(data.type,data.dir);
        });

        socket.on('next',(data)=>{
            game.performNext(data.type,data.dir);
        });

        socket.on('rotate',()=>{
            game.rotate();
        });

        socket.on('right',()=>{
            game.right();
        });

        socket.on('down',()=>{
            game.down();
        });

        socket.on('left',()=>{
            game.left();
        });

        socket.on('fall',()=>{
            game.fall();
        });

        socket.on('fixed',()=>{
            game.fixed();
        });

        socket.on('line',(data)=>{
            game.checkClear();
            game.addScore(data);
        });

        socket.on('time',(data)=>{
            game.setTime(data);
        });

        socket.on('lose',(data)=>{
            game.gameover(false);
        });

        socket.on('addTailLines',(data)=>{
            game.addTailLines(data);
        });
    }
    //开始
    var start = (type,dir)=>{
        var doms = {
            gameDiv:document.getElementById('remote_game'),
            nextDiv:document.getElementById('remote_next'),
            timeDiv:document.getElementById('remote_time'),
            scoreDiv:document.getElementById('remote_score'),
            resultDiv:document.getElementById('remote_gameover')
        }
        game = new Game();
        game.init(doms,type,dir);
    }
    bindEvents();
}