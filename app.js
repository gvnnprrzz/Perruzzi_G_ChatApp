const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

// Create a rate limiter
app.use(rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    message: 'Too many requests from this IP, please try again later.'
}));

// Tell Express where to find static web files
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
});

// Socket.io stuff goes here
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('connected', { sID: socket.id, message: 'new connection' });

    socket.on('chat_message', function (msg) {
        console.log(msg);
        io.emit('new_message', { message: msg });
    });

    socket.on('user_typing', function (user) {
        console.log(user);
        io.emit('typing', { currentlytyping: user });
    });

    socket.on('disconnect', () => {
        console.log("A user has disconnected from the chat");
        io.emit('user_disconnect', { sID: socket.id, message: 'disconnected' });
    });
});
