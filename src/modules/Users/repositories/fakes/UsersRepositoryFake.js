const { v4: uuidv4 } = require('uuid')
const { ObjectId } = require("mongoose").Types
const UserModel = require('../../infra/mongoose/entities/User')

const users = []

async function findById(_id) {

  const findUser = users.find((user) => user._id == _id)

  return findUser
}

function findByEmail(email) {
  const findUser = users.find((user) => user.email === email)

  return findUser
}

async function create(payload) {
  const user = new UserModel()


  Object.assign(user, { _id: uuidv4() }, payload)

  users.push(user)

  return user
}

async function save(user) {

  const findIndex = users.findIndex((findUser) => findUser._id === user._id)

  users[findIndex] = user

  return user
}

async function remove(code) {

  const findUser = users.find((user) => user.code === code)
  return findUser
}

const favoriteBook = async ({ _id, bookId }) => {

  const findIndex = users.findIndex((findUser) => findUser._id === _id)

  const user = {
    favorite_books: [],
    _id: "5fd527e1b14c2c0cd6469fd3",
    name: "jubileu",
    email: "j@gmail.com",
    phone: 51984503888,
    date_birth: "2020-12-12T00:00:00.000Z",
    password: "$2a$08$Edh0yTbZAFqQ4/IrBY5eyuGL8ajHxy.6La.Rf.f7uLzmiMOZ5Lh.6",
  }

  users[findIndex] = user.favorite_books = [{
    status: "not rented",
    rented: "",
    _id: "5fd5610ce9e6880135e5971f",
    title: "us gugu",
    bio: "lalala",
    author: "jubicara",
    price: 2000,
    category: "Horror",
    release: "2020-12-13T00:00:00.000Z",
    isbn: "dsded",
  }]

  return user

}

const unfavoriteBook = async ({ _id, bookId }) => {

  const findIndex = users.findIndex((findUser) => findUser._id === _id)

  const user = {
    favorite_books: [],
    _id: "5fd527e1b14c2c0cd6469fd3",
    name: "jubileu",
    email: "jwq@gmail.com",
    phone: 51984503888,
    date_birth: "2020-12-12T00:00:00.000Z",
    password: "$2a$08$Edh0yTbZAFqQ4/IrBY5eyuGL8ajHxy.6La.Rf.f7uLzmiMOZ5Lh.6",
  }

  users[findIndex] = user.favorite_books = []

  return user
}

module.exports = { findById, findByEmail, create, save, remove, favoriteBook, unfavoriteBook }