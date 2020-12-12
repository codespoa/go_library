const SearchBookService = require("../../../services/SearchBookService")
const BooksRepository = require('../../../repositories/BooksRepository')


const searchBook = async (request, response) => {
  const searchBook = SearchBookService
  const { name, author } = request.query

  const book = await searchBook(BooksRepository).execute({ name, author })

  return response.status(200).json(book)
}

module.exports = { searchBook }
