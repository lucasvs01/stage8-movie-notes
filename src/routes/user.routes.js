const { Router } = require("express");
const UserController = require("../Controllers/user.Controllers");

const userRoutes = Router();

const userController = new UserController;


userRoutes.post("/", userController.create);
userRoutes.put("/:user_id", userController.update);



module.exports = userRoutes;

 