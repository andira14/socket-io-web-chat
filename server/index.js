const express = require('express');
const {Server} = require('socket.io');
const http = require('http');

const bodyParser = require('body-parser');
const Database = require('./db/Database');
const Middleware = require('./Middleware');
const User = require('./user/User');
const cors = require('cors');

const port = 8080;

const initialize = async () => {
    
    try{
    await Database.initialize();

    const app = express();

    const server = http.createServer(app);

    const io = new Server(server, {cors: '*'});

    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('A user disconnected');
        })
        socket.on('all', (message) => {
            const now = new Date();
            message.createdAt = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
            !message.mention ? io.emit('all', message) : io.emit(message.mention, message);
        })
    })

    app.use(cors({origin: '*'}));

    app.use(bodyParser.json());

    app.use(Middleware.transformRequest);

    app.post('/login', User.login);

    app.post('/register',  User.register);

    return server

    } catch(e){
        console.log(e);
    }

}

initialize().then((server) => {
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
