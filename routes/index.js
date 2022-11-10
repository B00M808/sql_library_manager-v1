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
router.get('/', (req, res) => {
  res.redirect("/books");
 });
 
/* GET full list of books */
router.get("/books", asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });
  })
);  
/* Get Book Form */
router.get("/books/new", asyncHandler(async (req, res) => {
  res.render("new-book")})
);

/*POST a new book to the database */
router.post( 
  "/books/new", asyncHandler(async (req, res) => {
    const books = await Book.create();
  })
);

/* GET: Show book detail form */
router.get("/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      res.render("update-book", { book });  
    } else {
      res.sendStatus(404);
    }
  })

);

/* Update book info in the database */
router.post( 
  "/books/:id/edit", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/'); 
    } else {
      res.sendStatus(404);
    }
  })
);

/* POST: Delete an individual book */
router.post( 
  "/books/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.sendStatus(404);
    } 
  })
);

module.exports = router;
