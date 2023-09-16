const {Router} = require("express")
const routes = Router()

const userRoutes = require("../routes/user.routes")
const notesRoutes = require("../routes/notes.routes")


routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)

module.exports = routes;
