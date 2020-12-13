const FavoriteBookService = require("../../../services/FavoriteBookService")
const UnFavoriteBookService = require("../../../services/UnFavoriteBookService")
const UsersRepository = require('../../../../Users/repositories/UsersRepository')


const favorite = async (request, response) => {
  const { _id, bookId } = request.params

  const allBooks = await FavoriteBookService(UsersRepository).execute({ _id, bookId })

  return response.status(200).json(allBooks)
}

const unfavorite = async (request, response) => {
  const { _id, bookId } = request.params

  await UnFavoriteBookService(UsersRepository).execute({ _id, bookId })

  return response.status(204).json({message: "Unfavorite success"})
}

module.exports = { favorite, unfavorite }
