const RentBookService = require("../../../services/RentBookService")
const BooksRepository = require('../../../repositories/BooksRepository')


const rentBook = async (request, response) => {
  const rentBook = RentBookService
  const { status } = request.body
  const { isbn, rented } = request.params

  await rentBook(BooksRepository).execute({ isbn, status, rented })

  return response.status(200).json({message: 'Status update success'})
}

module.exports = { rentBook }
