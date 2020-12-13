const AppError = require('../../../shared/error/AppError')

const RentBookService = (repository) => ({

  async execute({ isbn, status, userID }) {
    const checkBookExists = await repository.findByCode(isbn)

    if (!checkBookExists)
      throw new AppError('This book not exists in system', 404)

    if (checkBookExists.status === 'rented')
      throw new AppError('This book is already rented', 400)

    if (checkBookExists.status === 'rented')
      userID = ''

    const book = await repository.saveRent({ isbn, status, userID })

    return book
  }

})

module.exports = RentBookService