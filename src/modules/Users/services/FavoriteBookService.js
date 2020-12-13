const AppError = require('../../../shared/error/AppError')

const FavoriteBookService = (repository) => ({

  async execute({_id, bookId}) {

    const checkUserExists = await repository.findById(_id)

    if (!checkUserExists)
      throw new AppError('This user not exists in system', 404)

    const user = await repository.favoriteBook({_id, bookId})

    return user
  }

})

module.exports = FavoriteBookService