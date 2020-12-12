const AppError = require('../../../shared/error/AppError')

const DeleteBookService = (repository) => ({

  async execute(isbn) {
    const checkBookExists = await repository.findByCode(isbn)

    if (!checkBookExists)
      throw new AppError('This book not exists in system', 404)

    if (checkBookExists.status === 'rented')
      throw new AppError('You cannot delete a rented book', 400)

    const book = await repository.remove(isbn)

    return book
  }

})

module.exports = DeleteBookService