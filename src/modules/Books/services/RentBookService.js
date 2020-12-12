const AppError = require('../../../shared/error/AppError')

const RentBookService = (repository) => ({

  async execute({ isbn, status, userID }) {
    const checkBookExists = await repository.findByCode(isbn)
    const checkUserExists = await repository.findUserById(userID)

    if (!checkBookExists || !checkUserExists)
      throw new AppError('This book or user not exists in system', 404)

    if (checkBookExists.status === 'rented' && checkBookExists.userID !== userID)
      throw new AppError('This book is already rented', 400)

    if (checkBookExists.status === 'rented')
      userID = ''

    const book = await repository.saveRent({ isbn, status, rented })

    return book
  }

})

module.exports = RentBookService