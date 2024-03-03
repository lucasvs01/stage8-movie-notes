const { Router } = require("express");
const notesControllers = require("../Controllers/notes.Controllers")

const notesRoutes = Router();

const NotesControllers = new notesControllers;

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

notesRoutes.post("/", NotesControllers.create)
notesRoutes.get("/:id", NotesControllers.show)
notesRoutes.delete("/:id", NotesControllers.delete)
notesRoutes.get("/", NotesControllers.index)

module.exports = notesRoutes;

