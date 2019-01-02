'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();

//Log request to console
app.use(logger('dev'));

//Parse incoming requests data
//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set up default catch route
app.get('*', (req, res)  => res.status(200).send({
    message: 'Welcome to the application!'
}));

module.exports = app;