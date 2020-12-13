const CreateBookService = require("../../../services/CreateBookService")
const DeleteBookService = require("../../../services/DeleteBookService")
const EditBookService = require("../../../services/EditBookService")
const BookModel = require("../../../repositories/BooksRepository")

const BooksRepository = require('../../../repositories/BooksRepository')


const create = async (request, response) => {
  const { title, bio, author, price, release, category, isbn } = request.body


  const book = await CreateBookService(BooksRepository).execute({
    title,
    bio,
    category,
    author,
    price,
    release,
    isbn
  })

  return response.status(201).json(book)
}

const index = async (request, response) => {
  const books = await BookModel.getAll()

  return response.json(books)

}

const show = async (request, response) => {
  const { isbn } = request.params

  const books = await BookModel.findByCode(isbn)

  return response.json(books)

}

const remove = async (request, response) => {
  const { isbn } = request.params

  const book = await DeleteBookService(BooksRepository).execute(isbn)

  return response.status(204).json(book)

}

const update = async (request, response) => {
  const { isbnParam } = request.params
  const { title, bio, author, category, price, release, isbn } = request.body

  const book = await EditBookService(BooksRepository).execute({
    title,
    bio,
    author,
    price,
    category,
    release,
    isbn,
    isbnParam
  })

  return response.status(200).json(book)
}

module.exports = { create, index, show, remove, update }
