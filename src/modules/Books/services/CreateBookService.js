const startOfDay = require('date-fns/startOfDay')
const AppError = require('../../../shared/error/AppError')

const CreateBookService = (repository) => ({

  async execute({
    title,
    bio,
    author,
    price,
    category,
    release,
    isbn
  }) {
    const checkBookExists = await repository.findByCode(isbn)


    if (checkBookExists)
      throw new AppError('This isbn already exists in the system', 409)

    const bookDateRelease = startOfDay(release)

    const book = await repository.create({
      title,
      bio,
      author,
      price,
      category,
      release: bookDateRelease,
      isbn
    })

    return book
  }

})

module.exports = CreateBookService