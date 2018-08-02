const express = require('express');
const path = require('path');
const morgan = require('morgan');

const indexRouter = require('./src/routes/index');
const blocksRouter = require('./src/routes/blocks');

const app = express();

//app.use(logger('dev'));
app.use(morgan("combined"));
/*app.use(bodyParser.json);*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter);
app.use('/blocks', blocksRouter);

module.exports = app;
