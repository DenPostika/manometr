var express = require('express');
var app = express();
var server = app.listen((process.env.PORT || 5000));
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/html/images'));
app.use(express.static(__dirname + '/html/css'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/valve', function(req, res) {
    res.sendFile(__dirname + '/html/valve.html');
});

exports.io = function () {
    return io;
};

io.on('connection', function(socket){
    socket.on('hydrogen', function(data){
        io.emit('data', data)
    });

    socket.on('lamps', function(data){
        io.emit('lampsData', data)
    })
});

