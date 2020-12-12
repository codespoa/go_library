module.exports = (middleware) => (req, res, next) => {

  if (req.admin) return next()
  return middleware(req, res, next)

}