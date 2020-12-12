const AppError = require('../../../shared/error/AppError')

const SearchBookService = (repository) => ({

  async execute({ name, author }) {
    const checkBookExists = await repository.findBook({ name, author })

    if (!checkBookExists)
      throw new AppError('This book not exist', 404)

    return checkBookExists
  }

})

module.exports = SearchBookService