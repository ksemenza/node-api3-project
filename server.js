const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

/*
logger()
    logger logs to the console the following information about each request: request method, request url, and a timestamp
    this middleware runs on every request made to the API
 */
//custom middleware

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`
    );
    next();
}

server.use(logger);
server.use('/posts', postRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
    res.send('Welcome to the Thunder Dome');
});

module.exports = server;
