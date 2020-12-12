const RentBookService = require("../../../services/RentBookService")
const BooksRepository = require('../../../repositories/BooksRepository')


const rentBook = async (request, response) => {
  const { status } = request.body
  const { isbn, userID } = request.params

  await RentBookService(BooksRepository).execute({ isbn, status, userID })

  return response.status(200).json({message: 'Status update success'})
}

module.exports = { rentBook }
