const {Router} = require("express")
const routes = Router()

const Authenticated = require("../middlewares/ensureAuthenticated")
const userRoutes = require("../routes/user.routes")
const notesRoutes = require("../routes/notes.routes")
const tagsRoutes = require("../routes/tags.routes")
const sessionsRoutes = require("../routes/sessions.routes")

routes.use("/users", userRoutes)
routes.use("/notes", Authenticated, notesRoutes)
routes.use("/tags", Authenticated, tagsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes;
