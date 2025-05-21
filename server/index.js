import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import connectDB  from './db.js';
import { Howl, User } from './db.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
let a = 0;
const chats = [];
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.id);

    socket.on('send', (data) => {
        console.log(`from socket id:${socket.id}:${data}`);
        chats.push(data);
        socket.emit('receive', data);
        socket.broadcast.emit('receive', data);
    });
    socket.on('join', (room) => {
        console.log(`User joined room: ${room}`);
        socket.join(room);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


app.get('/', (req, res) => {
    io.emit('message', 'Hello from server');
    a++;
    res.send(`message sent${a}`);
});


app.post('/user', async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);

    if (name && password) {
        const user = new User({ name, password });

        try {
            await user.save(); // modern way
            res.status(200).json({ message: 'User created successfully' });
        } catch (err) {
            console.error('Error saving user:', err);
            res.status(500).json({ message: 'Internal server error' });
        }

    } else {
        res.status(400).json({ message: 'Missing name or password' });
    }
});


server.listen(3000, () => {
    console.log('running on http://localhost:3000');
});