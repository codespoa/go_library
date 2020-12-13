const UserModel = require('../infra/mongoose/entities/User')
const { ObjectId } = require("mongoose").Types


const getAll = async () => await UserModel.find({}).select('-password')

const findById = async _id => {
  const user = await UserModel.findById(_id).select('-password').populate('favorite_books')

  return user
}

const findByEmail = async email => await UserModel.findOne({ email }).select("+password")

const save = async (payload) => {
  const { name, email, phone, date_birth, password } = payload

  const user = new UserModel
  user.name = name
  user.email = email
  user.phone = phone
  user.date_birth = date_birth
  user.password = password

  await user.save()

  return user
}

const create = async (payload) => {
  const { name, email, phone, date_birth, password } = payload

  const user = await UserModel.create({
    name,
    email,
    phone,
    date_birth,
    password
  })

  return user
}

const remove = async _id => await UserModel.findOneAndDelete({ _id })


const favoriteBook = async ({ _id, bookId }) => {

  const idBook = ObjectId(bookId)

  return await UserModel.findOneAndUpdate({ _id }, { $addToSet: { favorite_books: idBook } }, { new: true }).populate('favorite_books')
}

const unfavoriteBook = async ({ _id, bookId }) => {

  const idBook = ObjectId(bookId)

  return await UserModel.findOneAndUpdate({ _id }, { $pull: { favorite_books: idBook } }, { new: true })
}

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findByEmail,
  create,
  favoriteBook,
  unfavoriteBook
}