var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//commit
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   //res.status(err.status || 500);
//   //res.render('error');
// });

//404 Error Handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//Global Error Handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  if (err.status === 500) {
    err.message = err.message || `404 Page Not Found`
    console.error(err.message);
  } else {
    err.message = err.message || `Sorry! We couldn't find the page you were looking for..`
    console.error(err.message);
  }
  
});

//Start up the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
}) 
