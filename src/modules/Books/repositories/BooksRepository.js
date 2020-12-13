const BookModel = require('../infra/mongoose/entities/Book')
const UserModel = require('../../Users/infra/mongoose/entities/User')

const getAll = async () => await BookModel.find({})

const findByCode = async isbn => await BookModel.findOne({ isbn })

const findUserById = async userId => await UserModel.findOne({ _id: userId })

const save = async (payload) => {
  const { title, bio, author, price, release, category, isbn, status } = payload

  const book = await BookModel.findOne({ isbn });

  book.title = title
  book.bio = bio
  book.author = author
  book.price = price
  book.category = category
  book.release = release
  book.isbn = isbn
  book.status = status

  await book.save()

  return book
}

const findBook = async ({ title, author }) => await BookModel.find().or([{ title }, { author }])

const saveRent = async ({ isbn, status, userID }) => await BookModel.findOneAndUpdate({ isbn }, { status, rented: userID }, { returnOriginal: false })

const create = async (payload) => {
  const { title, bio, author, price, release, category, isbn } = payload

  const book = await BookModel.create({
    title,
    bio,
    author,
    price,
    category,
    release,
    isbn
  })

  return book
}

const remove = async isbn => await BookModel.findOneAndDelete({ isbn })

module.exports = {
  getAll,
  findByCode,
  save,
  remove,
  create,
  saveRent,
  findBook,
  findUserById
}