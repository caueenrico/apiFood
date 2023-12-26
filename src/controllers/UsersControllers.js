const { hash } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")


class UsersControllers {
  async create(request, response){
    const {name, email, password} = request.body
    
    const checkUserExists = await knex("users").where({email})
    
    if(checkUserExists.length > 0){
      throw new AppError('este e-mail já foi usado por outro usuário', 401)
    }

    const passwordHashed = await hash(password, 8) //criptografando as senhas dos usuarios
    

    await knex("users").insert({name, email, password: passwordHashed })
    
    console.log('foi')
    response.status(200).json()
  }
}

module.exports = UsersControllers