const { Router } = require("express");
const SessionsController = require("../controllers/SessionsController");


const sessionRoutes = Router()   
const sessionController = new SessionsController()

sessionRoutes.post('/', sessionController.create)

module.exports = sessionRoutes