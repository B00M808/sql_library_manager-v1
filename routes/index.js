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

//Routes:

/* GET full list of book listings */
router.get('/', async (req, res) =>{
  const books = await Book.findAll({ order: [[ "createdAt", "DESC" ]]});
  res.render("index", { books, title: "Sequelize-It"});
}); 

/* Create a new book form */
router.get('/new', (req, res) => {
  res.render("new-book", { book: {}, title: "New Book" });
}); 

/* POST a new book to the database */
router.post('/', async (req, res) => {
  res.redirect("/books");
});

/* GET: Show book detail form */
router.get("/books/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  console.log('Test', book);
  if(book) {
    res.render("update-book", { book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
}); 

/* Update book info in the database */
router.post('/books/:id/edit', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.update(req.body);
    res.redirect("/books/" + book.id); 
  } else {
    res.sendStatus(404);
  }
});

/* POST: Delete an individual book */
router.post("/:id/delete", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  } 
  res.render("books/delete", {book: {}, title: "Delete Book"})
  
});

module.exports = router;
