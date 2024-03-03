const { Router } = require("express");
const SessionsController = require("../Controllers/sessions.Controllers")

const sessionsRoutes = Router();

const sessionsControllers = new SessionsController;

sessionsRoutes.post("/", sessionsControllers.create)


module.exports = sessionsRoutes;

