const { Router } = require("express");
const UserController = require("../Controllers/user.Controllers");

const userRoutes = Router();

const userController = new UserController;


userRoutes.get("/", userController.create);

module.exports = userRoutes;

 