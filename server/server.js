const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'Admin',
  //   text: 'Welcome to chat app'
  // });
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));

  // socket.broadcast.emit('newMessage', {
  //   form: 'Admin',
  //   text: 'New user joined'
  // });
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // socket.emit('newMessage', {
  //   from: 'Rahul',
  //   text: 'Check',
  //   createdAt: 123
  // });

  // socket.emit('newEmail', {
  //   from: 'rahul@abc.com',
  //   test: 'hello',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('newEmail', newEmail);
  //});
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
