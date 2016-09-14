//'use strict';

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('SERVER SAYS: A user connected');

    // socket.emit is a custom event
    socket.emit('news', { hello: 'world from SERVER SIDE!' });

    socket.on('my other event', (data) => {
      const str = JSON.stringify(data, null, 4);
      console.log('SERVER SAYS: %s', str);
    });

    //Send a message after a timeout of 4seconds
    setTimeout(() => {
      //socket.send('SERVER SAYS: Sent a message 4seconds after connection!');

      //Sending an object when emmiting an event
      socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
    }, 8000);

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
      console.log('SERVER SAYS: A user disconnected');
    });

    socket.on('clientEvent', (data) => {
      console.log(data);
    });
  });
};
