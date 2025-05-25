import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';
import connectDB  from './db.js';
import { Howl, User } from './db.js';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})
connectDB();


app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5001', 'https://howler.rujenm.com.np'],
    methods: ['GET', 'POST'],
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('send', async (data) => {
        
        const howl = new Howl({
            poster: {'socketID': socket.id, 'objID': null },   
            message: data,
        });
        try {
            await howl.save();
            // console.log('Howl saved successfully');
        } catch (err) {
            console.error('Error saving howl:', err);
        }
        // console.log(`from socket id:${socketID}:${data}`);
        socket.emit('receive', {
            poster: {'socketID': socket.id, 'objID': null },
            message: data,
        });
        socket.broadcast.emit('receive', data);
    });
    socket.on('join', (room) => {
        // console.log(`User joined room: ${room}`);
        socket.join(room);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/chat/global', async (req, res) => {
     try {
    const howls = await Howl.find()
      .populate({
        path: 'poster',
        select: 'name -_id', // only get the username
      })
      .sort({ createdAt: -1 }); // newest first

    res.json(howls.map(howl => ({
  poster: howl.poster.name || howl.poster,
  message: howl.message,
})));

  } catch (err) {
    console.error('Error fetching howls:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
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