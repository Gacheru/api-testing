'use strict'
//Application entry.
const http = require('http');
//import express app
const app = require('../app'); 

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);