const AppError = require('../../../shared/error/AppError')

const EditBookService = (repository) => ({

  async execute({
    title,
    bio,
    author,
    price,
    category,
    release,
    isbn,
    isbnParam
  }) {
    const checkBookExists = await repository.findByCode(isbnParam)

    if (!checkBookExists)
      throw new AppError('This book not exist', 404)

    if (checkBookExists.status === 'rented')
      throw new AppError('You cannot edit a rented book', 400)

    const book = await repository.save({
      title,
      bio,
      author,
      category,
      price,
      release,
      isbn
    })

    return book
  }

})

module.exports = EditBookService











