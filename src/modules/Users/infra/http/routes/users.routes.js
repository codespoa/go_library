const { Router } = require('express')
const usersRouter = Router()
const usersController = require("../controllers/UsersController")
const favoriteBookController = require("../../../../Users/infra/http/controllers/FavoriteBookController")

const Validate = require("../../../../../shared/middlewares/validate");
const validatorsUser = require("../../../../../shared/validators/User");

const Resolver = require('../../../../../shared/middlewares/adpter')

usersRouter.get("/", Resolver(usersController.index))
usersRouter.post("/", Validate(validatorsUser.create), Resolver(usersController.create))
usersRouter.get("/:_id", Resolver(usersController.show))
usersRouter.delete("/:_id", Resolver(usersController.remove))
usersRouter.post("/:_id/favorite-book/:bookId", Resolver(favoriteBookController.favorite))
usersRouter.delete("/:_id/favorite-book/:bookId", Resolver(favoriteBookController.unfavorite))

module.exports = usersRouter
