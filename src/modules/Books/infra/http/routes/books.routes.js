const { Router } = require('express')
const booksRouter = Router()
const booksController = require("../controllers/BooksController")
const rentBooksController = require("../controllers/RentBooksController")
const searchBooksController = require("../controllers/SearchBooksController")

const Validate = require("../../../../../shared/middlewares/validate")
const validatorsBook = require("../../../../../shared/validators/Book")

const ensureAuthenticad = require('../../../../Users/infra/http/middleware/ensureAuthenticad')

booksRouter.use(ensureAuthenticad)

const Resolver = require('../../../../../shared/middlewares/adpter')

booksRouter.post("/", Validate(validatorsBook.create), Resolver(booksController.create))
booksRouter.get("/", Resolver(booksController.index))
booksRouter.get("/search", Resolver(searchBooksController.searchBook))
booksRouter.get("/:isbn", Resolver(booksController.get))
booksRouter.delete("/:isbn", Resolver(booksController.remove))
booksRouter.put("/:isbnParam", Validate(validatorsBook.edit), Resolver(booksController.update))
booksRouter.patch("/:isbn/rent/:userID", Validate(validatorsBook.rent), Resolver(rentBooksController.rentBook))


module.exports = booksRouter
