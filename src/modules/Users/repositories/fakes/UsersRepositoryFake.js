const { v4: uuidv4 } = require('uuid');
const UserModel = require('../../infra/mongoose/entities/User')

function findById(id) {
  const users = []

  const findUser = users.find((user) => user.id === id)

  return findUser
}

function findByEmail(email) {
  const users = [{
    email: "jonh@example.com",
    password: '$2a$08$uNlMdR49/azEYaCEwAmZX.qMp0H3WAwSxGPEIJvrkdcedxh0ocy9a',
    id: uuidv4()
  }]

  const findUser = users.find((user) => user.email === email)

  return findUser
}

function create(payload) {
  const users = [{
    id: uuidv4()
  }]

  const user = new UserModel()

  Object.assign(user, { id: uuidv4(), }, payload)

  users.push(user)

  return user
}

function save(user) {
  const users = []

  const findIndex = users.findIndex((findUser) => findUser.id === user.id)

  users[findIndex] = user

  return user
}

function remove(code) {
  const users = []

  const findUser = users.find((user) => user.code === code)
  return findUser
}

module.exports = {findById, findByEmail, create, save, remove}