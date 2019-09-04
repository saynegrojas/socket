//============================= EVERYONE ======================

var app = require('express')();
var http = require('http').createServer(app);

//io instance of socket.io passing the http server object
var io = require('socket.io')(http);
io.emit('some event', { for: 'everyone' });


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//EMMIT EVENTS - send and receive any events and data
//             - make it when user types message, server gets it as chat message event
//             - change scripts in html


//BROADCASTING - is to emit the event from server to the rest of the users
//             - to send an event to everyone, Socket.io gives us the
//             - io.emit


//CONNECTION - establish a connection/disconnection with socket.io 
io.on('connection', function(socket) {

    //EMMITTING EVENTS
    //Print out the chat message event
    socket.on('chat message', function(msg) {
        console.log('user: ' + msg);


        //BROADCASTING
        //On client side, when chat message event is captured
        //We include it to the page
        io.emit('chat message', msg);
    });

    //DISCONNECTION
    //Each socket fires a disconnect event
    socket.on('disconnect', function() {
        console.log('user disconnected');
    })
});
//http now listening on the connetion event for incoming sockets, then log.
//To load the socket.io-client, (this exposes a io global) add snippits to index.html
//snippet of scripts tag src= /socket.io/socket.io.js
//In a scripts tag initialize an instance of socket = io()
http.listen(3000, function(){
  console.log('listening on *:3000');
});

//============================= PRIVATE =======================

// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);

// users = [];
// connections = [];

// server.listen(process.env.PORT || 3000);
// console.log('Server running');

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// io.sockets.on('connection', function(socket) {
//     connections.push(socket);
//     console.log('Connected: %s sockets connected', connections.length);
    
// })
