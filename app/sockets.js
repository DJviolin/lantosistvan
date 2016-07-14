'use strict';

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('SERVER: A user connected');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', (data) => {
      console.log('SERVER: ', data);
    });
  });
};
