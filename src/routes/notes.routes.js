const { Router } = require("express");
const notesControllers = require("../Controllers/notes.Controllers")

const notesRoutes = Router();

const NotesControllers = new notesControllers;

notesRoutes.post("/:user_id", NotesControllers.create)
notesRoutes.get("/:id", NotesControllers.show)
notesRoutes.delete("/:id", NotesControllers.delete)

module.exports = notesRoutes;

