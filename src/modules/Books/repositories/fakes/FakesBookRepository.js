const { v4: uuidv4 } = require('uuid')
const BookModel = require('../../infra/mongoose/entities/Book')

const books = []

async function create(payload) {
  const book = new BookModel()

  Object.assign(book, { id: uuidv4() }, payload)

  books.push(book)

  return book
}

async function getAll() {
  const findBook = books.find((user) => user.id === id)

  return findBook
}

async function findByCode(isbn) {
  const findBook = books.find((book) => book.isbn === isbn)

  return findBook
}

async function findUserById(userId) {

  const findBook = books.find((book) => book.id === userId)

  return findBook
}


async function save(book) {
  const findIndex = books.findIndex((findBook) => findBook.id === book.id)

  books[findIndex] = book

  return book
}

async function findBook({title, author}) {

  const findBook = books.find((book) => book.title === title || book.author === author)

  return findBook
}

async function saveRent({ isbn, status, userID }) {
  const findIndex = books.find((findBook) => findBook.isbn === isbn)


  books[findIndex] = { isbn, status, userID }

  return { isbn, status, userID }
}


async function remove(isbn) {
  const findBook = books.find((book) => book.isbn === isbn)
  
  return findBook
}

module.exports = { getAll, findByCode, create, save, findBook, saveRent, remove, findUserById }