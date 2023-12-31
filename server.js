const express = require('express');
const path = require('path');
const http = require('http');

let app = express()

let user_name="";

app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.port || 4500;


let server = http.createServer(app);

const io = require('socket.io')(server);


let users=0;


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public')+'/index.html')
})


io.on('connection',function(socket){
    console.log("user has been connected");
    users++;

    socket.on('name',function(value){
        socket.broadcast.emit('name_br',value);
    })

    io.sockets.emit('no_of_users',users);


    socket.on('user_name', function(value) {
        user_name = value;
        socket.broadcast.emit('broadcast', user_name);
    });

    socket.on("image-broadcast",function(value){
        socket.broadcast.emit("broadcast-image",value)
    })

    

    socket.on('disconnect',function(){
        console.log("user is disconnected");
        socket.on('name',function(value){
            socket.broadcast.emit('disc',value);
        })
        users--;
    });
});

server.listen(port,function(){
    console.log("your server is running at http://localhost:4500")
})


