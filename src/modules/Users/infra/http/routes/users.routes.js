const { Router } = require('express')
const usersRouter = Router()
const usersController = require("../controllers/UsersController")

const Validate = require("../../../../../shared/middlewares/validate");
const validatorsUser = require("../../../../../shared/validators/User");

const Resolver = require('../../../../../shared/middlewares/adpter')


usersRouter.get("/", Resolver(usersController.index))
usersRouter.post("/", Validate(validatorsUser.create), Resolver(usersController.create))


module.exports = usersRouter
