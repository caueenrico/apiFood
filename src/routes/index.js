const { Router } = require("express");
const userRoutes = require("./user.routes");
const menuRoutes = require("./menu.routes");
const sessionRoutes = require("./sessions.routes");

const routes = Router()

routes.use('/user', userRoutes)
routes.use("/menu", menuRoutes)
routes.use("/sessions", sessionRoutes)

module.exports = routes 