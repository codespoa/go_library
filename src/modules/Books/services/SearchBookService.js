const AppError = require('../../../shared/error/AppError')

const SearchBookService = (repository) => ({

  async execute({ title, author }) {
    const checkBookExists = await repository.findBook({ title, author })

    if (!checkBookExists)
      throw new AppError('This book not exist', 404)

    return checkBookExists
  }

})

module.exports = SearchBookService