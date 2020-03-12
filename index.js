// code away!

const express = require('express');
const server = require('./server.js')
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`API RUNNING PORT: ${port}`))
