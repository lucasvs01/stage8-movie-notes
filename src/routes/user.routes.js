const { Router } = require("express");
const UserController = require("../Controllers/user.Controllers");
const UserAvatarController = require("../Controllers/userAvatar.Controllers");
const uploadConfigs = require("../configs/upload");
const multer = require("multer")


const  ensureAuthenticated  = require("../middlewares/ensureAuthenticated")
const upload = multer(uploadConfigs.MULTER);

const userRoutes = Router();

const userController = new UserController;
const userAvatarController = new UserAvatarController;


userRoutes.post("/", userController.create);
userRoutes.put("/", ensureAuthenticated, userController.update);
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = userRoutes;

 