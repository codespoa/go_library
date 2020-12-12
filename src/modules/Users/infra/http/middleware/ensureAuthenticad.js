const { verify } = require("jsonwebtoken")

const configAuth = require("../../../../../config/auth")

const AppError = require("../../../../../shared/error/AppError")

const ensureAuthenticad = (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("Token JWT is missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const decoded = verify(token, configAuth.jwt.secret)

    const { sub } = decoded
    request.user = {
      _id: sub,
    }

    return next()
  } catch {
    throw new AppError("Token JWT invalid", 401)
  }
}

module.exports = ensureAuthenticad
