const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken")

const AppError = require('../../../shared/error/AppError')
const configAuth = require("../../../config/auth")


const AuthenticateUserService = (repository) => ({

  async execute({ email, password }) {
    const user = await repository.findByEmail(email)


    if (!user) {
      throw new AppError(
        "Email e/ou senha incorretos, por favor verifique seus dados", 404)
    }

    const passwordMathed = await bcrypt.compare(password, user.password)

    if (!passwordMathed) {
      throw new AppError(
        "Email e/ou senha incorretos, por favor verifique seus dados", 404)
    }

    const { secret, expiresIn } = configAuth.jwt


    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
})

module.exports = AuthenticateUserService
