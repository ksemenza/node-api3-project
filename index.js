// code away!

const express = require('express');
const server = require('./server.js')


const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`API RUNNING PORT: ${port}`))
