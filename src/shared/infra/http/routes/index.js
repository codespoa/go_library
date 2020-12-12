const userRoute = require('../../../../modules/Users/infra/http/routes/users.routes')
const sessionsRouter = require('../../../../modules/Users/infra/http/routes/sessions.routes')
const booksRouter = require('../../../../modules/Books/infra/http/routes/books.routes')

const routes = (app) => {
  app.use('/user', userRoute);
  app.use('/session', sessionsRouter)
  app.use('/book', booksRouter)
};

module.exports = routes;
