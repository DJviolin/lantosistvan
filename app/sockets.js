'use strict';

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('SERVER SAYS: A user connected');

    socket.emit('news', { hello: 'world from SERVER SIDE!' });
    socket.on('my other event', (data) => {
      console.log('SERVER SAYS: ', data);
    });

  });

};
