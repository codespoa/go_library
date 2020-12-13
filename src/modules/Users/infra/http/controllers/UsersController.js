const CreateUserService = require("../../../services/CreateUserService")
const DeleteUserService = require("../../../services/DeleteUserService")
const UserRepository = require("../../../repositories/UsersRepository")
const UserModel = require("../../../repositories/UsersRepository")


const create = async (request, response) => {
  const { name, email, phone, date_birth, password } = request.body

  const user = await CreateUserService(UserRepository).execute({
    name,
    email,
    phone,
    date_birth,
    password
  })

  return response.status(201).json(user)
}

const index = async (request, response) => {
  const users = await UserModel.getAll()

  return response.json(users)

}

const show = async (request, response) => {
  const { _id } = request.params
  const user = await UserModel.findById(_id)

  return response.json(user)

}

const remove = async (request, response) => {
  const { _id } = request.params

  const user = await DeleteUserService(UserRepository).execute(_id)

  return response.status(204).json(user)

}

module.exports = { create, index, show, remove }