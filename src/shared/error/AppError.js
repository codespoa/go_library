class AppError extends Error {
  constructor(message, code) {
    super(message, code)
    this.name = 'Internal error'
    this.statusCode = code || 500
  }
}

module.exports = AppError