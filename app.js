var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index");

const Sequelize = require('sequelize');

var indexRouter = require('./routes/index');
const { builtinModules } = require('module');

var app = express();
db.sequelize.authenticate()
db.sequelize.sync() 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Modules
app.use('/', indexRouter);

/* 404 Error Handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Global Error Handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
    //res.render('page-not-found');
  }
  if (err.status === 404) {
    err.message = err.message || `404 Page Not Found`;
    console.error(err.message);
    res.status(404).render('page-not-found');
  } else {
    err.message = err.message || `Oooops! Server Not Found`;
    console.error(err.message);
    res.status(err.status || 500).render('error', { err });
  }
});

//Start up the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
})

module.exports = app;