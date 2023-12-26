const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class MenuPictureController {
  async updatePicture(request, response) {
    const {menu_id} = request.params;
    const pictureFileName = request.file.filename;

    const menuSelected = await knex("menu").where({ id: menu_id }).first();

    if (!menuSelected) {
      throw new AppError("Este prato não existe", 401);
    }
    
    const diskStorage = new DiskStorage();
   
    if (menuSelected.picture) {
      await diskStorage.deleteFile(menuSelected.picture);
    }

    const filename = await diskStorage.saveFile(pictureFileName);
    menuSelected.picture = filename;

    await knex("menu").update(menuSelected).where({ id: menu_id });

    return response.json(menuSelected);
  }
}

module.exports = MenuPictureController;
