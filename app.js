var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index");

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'books.db'
});

/*Handler function to wrap each route */
function asyncHandler(db){
  return async(req, res, next) => {
    try {
      await db(req, res, next)
    } catch(error) {
      res.status(500).send(error);
      /* Forward error to the global error handler
      next(error); */
    }
  }
}

//Book Model
class Book extends Sequelize.Model {}
Book.init({
  title: Sequelize.STRING,
}, { sequelize });

//async IIFE
(async () => {
//sync Books table
await sequelize.sync({ force: true });

try {
//Instance of the Book class reps a database row
const book = await Book.create({
  title: 'A Brief History of Time',
});
console.log(book.toJSON());

} catch (error) {
  console.log('Error connecting to the database: ', error);
}
})();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
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
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  /*if statement, if not 404 create 500 error
  */
});

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
    err.message = err.message || `Oooops! We couldn't find the page you were looking for..`
    console.error(err.message);
  }
  
});

//Start up the server
app.listen(3000, function() {
  console.log('Server started on port 3000');
})

module.exports = app;