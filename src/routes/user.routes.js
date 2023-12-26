const { Router } = require("express");
const UsersControllers = require('../controllers/UsersControllers')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const multer = require("multer");
const uploadConfig = require('../configs/upload')
const UserAvatarController = require('../controllers/UserAvatarController')

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER);

const userController = new UsersControllers()
const userAvatarController = new UserAvatarController()

userRoutes.post('/', userController.create)
userRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = userRoutes