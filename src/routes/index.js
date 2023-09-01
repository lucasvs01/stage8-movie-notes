const {Router} = require("express")
const routes = Router()

const userRoutes = require("../routes/user.routes")


routes.use("/users", userRoutes)

module.exports = routes;
