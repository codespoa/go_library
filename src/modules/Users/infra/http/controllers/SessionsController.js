const AuthenticateUserService = require("../../../services/AuthenticateUserService") 
const UserRepository = require("../../../repositories/UsersRepository")


const create = async (request, response) => {
  const authenticateUser = AuthenticateUserService
  const { email, password } = request.body

  const user = await authenticateUser(UserRepository).execute({
    email,
    password,
  })

  return response.json(user)
}

module.exports = { create }
