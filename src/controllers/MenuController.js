const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

//create, read, update, delete

class MenuController {
  async create(request, response) {
    const { title, category, ingredients, price, description } = request.body;
    const user_id  = request.user.id;
    const picture = request.file.filename
    
    const ingredientsArray = JSON.parse(ingredients || '[]');

    console.log(ingredientsArray)

    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(picture)

    const [menu_id] = await knex("menu").insert({
      user_id,
      title,
      category,
      price,
      description,
      picture: filename
    });

    const ingredientsInsert = ingredientsArray.map((name) => {
      return {
        menu_id,
        user_id,
        name,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    response.status(200).json("Prato adicionado com sucesso");
  }

  async show(request, response) {
    const { id } = request.params

    const menu = await knex("menu").where({id}).first()
    const ingredients = await knex("ingredients").where({menu_id: id}).orderBy("name")

    console.log(id)

    return response.json({
      ...menu,
      ingredients
    })
    
  }

  async index(request, response) {
    const { title, ingredient } = request.query;

    let menus;

    if (ingredient) {
      const filterIngredients = ingredient
        .split(",")
        .map((ingred) => ingred.trim()); //tive que fazer isso para transformar em um vetor

      menus = await knex("ingredients")
        .select(["menu.id", "menu.title", "menu.description", "menu.price"])
        .whereLike("menu.title", `%${title}%`)
        .whereIn("name", filterIngredients)
        .innerJoin("menu", "menu.id", "ingredients.menu_id");

      console.log(menus);
    } else {
      menus = await knex("menu").whereLike("title", `%${title}%`);
    }

    const ingredients = await knex("ingredients");
    const menuWithIngre = menus.map((menu) => {
      const menuIngre = ingredients.filter(
        (ingred) => ingred.menu_id === menu.id
      );

      return {
        ...menu,
        ingredients: menuIngre,
      };
    });

    return response.json(menuWithIngre);
  }

  async delete(request, response) {
    const user_id = request.user.id;

    console.log(user_id);

    await knex("menu").where("id", user_id).delete();

    return response.json("menu deletado");
  }

  async update(request, response) {
    const { title, price, description } = request.body;
    const { menu_id } = request.params;

    await knex("menu")
      .where({ id: menu_id })
      .update({ title, price, description});

    return response.json("atualizado prato");
  }
}

module.exports = MenuController;
