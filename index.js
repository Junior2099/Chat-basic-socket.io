const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const messages = [];

io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('new_message', (data) => {
        messages.push(data.msg);
        io.emit('update_messages', messages);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
