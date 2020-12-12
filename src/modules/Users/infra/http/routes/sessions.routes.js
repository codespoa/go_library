const { Router } = require('express')
const sessionsController = require("../controllers/SessionsController")
const sessionsRouter = Router()

const Validate = require("../../../../../shared/middlewares/validate");
const validatorsSessions = require("../../../../../shared/validators/Sessions");

const Resolver = require('../../../../../shared/middlewares/adpter')

sessionsRouter.post("/", Validate(validatorsSessions.login), Resolver(sessionsController.create))

module.exports = sessionsRouter