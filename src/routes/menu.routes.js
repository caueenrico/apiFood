const { Router } = require("express");
const MenuController = require("../controllers/MenuController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");
const multer = require("multer");
const MenuPictureController = require("../controllers/MenuPictureController");

const menuRoutes = Router()
const upload = multer(uploadConfig.MULTER)
const menuController = new MenuController()
const menuPictureController = new MenuPictureController()

menuRoutes.use(ensureAuthenticated)

menuRoutes.post('/', upload.single("picture"), menuController.create)
menuRoutes.get('/index', menuController.index)
menuRoutes.get("/:id", menuController.show)
menuRoutes.delete('/', menuController.delete)
menuRoutes.put('/:menu_id', menuController.update)
menuRoutes.patch("/picture/:menu_id",upload.single("picture"), menuPictureController.updatePicture)

module.exports = menuRoutes