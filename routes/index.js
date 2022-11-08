var express = require('express');
const { sequelize } = require('../models');
var router = express.Router();
const Book = require('../models').Book;

var find_all=function (req,res,next)
{
  Book.findAll().then(books =>
  {
    res.json(books);
});

};

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

//Routes:

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
 });

/* GET full list of book listings */
router.get('/', asyncHandler(async (req, res) =>{
  const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]]});
  res.render("books/index", { books, title: "Sequelize-It"});
})); 

/* Create a new book form */
router.get('/new', (req, res) => {
  res.render("books/new", { book: {}, title: "New Book" });
}); 

/* POST a new book to the database */
router.post('/', asyncHandler(async (req, res) => {
  res.redirect("/books");
}));

/* GET: Show book detail form */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  //res.render("books/show", { book, title: book.title });
  if(book) {
    res.render("books/show", { book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
})); 

/* Update book info in the database */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  //res.redirect("/books/");
  const book = await Book.findByPk(req.params.id);
  if(book) {
    //res.render("books/edit", { book, title: "Edit Book" });      
    await book.update(req.body);
    res.redirect("/books/" + book.id); 
  } else {
    res.sendStatus(404);
  }
}));

/* POST: Delete an individual book */
router.post("/:id/delete", asyncHandler(async (req, res) => {
  /* const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  } */
  res.render("books/delete", {book: {}, title: "Delete Book"})
  
}));

module.exports = router;
