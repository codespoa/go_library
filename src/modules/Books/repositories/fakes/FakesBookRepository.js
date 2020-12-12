const { v4: uuidv4 } = require('uuid');
const BookModel = require('../../infra/mongoose/entities/Book')

const books = []

function create(payload) {
  const book = new BookModel()

  Object.assign(book, { id: uuidv4() }, payload)

  books.push(book)

  return book
}

function getAll() {
  const findBook = books.find((user) => user.id === id)

  return findBook
}

function findByCode(code) {
  const findBook = books.find((book) => book.sbnCode === code)

  return findBook
}


function save(book) {
  const findIndex = books.findIndex((findBook) => findBook.id === book.id)

  books[findIndex] = book

  return book
}

function findBook(name, author) {
  const findBook = books.find((book) => book.name === name || book.author === author)
  return findBook
}

const saveRent = ({ sbnCode, status, rented }) => {
  const findIndex = books.find((findBook) => findBook.sbnCode === sbnCode)

  books[findIndex] = { sbnCode, status, rented }

  return { sbnCode, status, rented }
}


function remove(code) {
  const findUser = books.find((user) => user.code === code)
  return findUser
}

module.exports = { getAll, findByCode, create, save, findBook, saveRent, remove }