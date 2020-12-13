const { v4: uuidv4 } = require('uuid');
const UserModel = require('../../infra/mongoose/entities/User')

const users = []

async function findById(_id) {


  const findUser = users.find((user) => user._id)


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

module.exports = {findById, findByEmail, create, save, remove}