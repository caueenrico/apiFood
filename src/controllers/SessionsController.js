const { compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

//jwt
const authConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")


class SessionsController {
  async create(request, response){
    const {email, password} = request.body

    const userExists = await knex("users").where({email}).first()

    if(!userExists){
      throw new AppError('e-mail ou senha incorreta', 401)
    }

    const passwordMatch = await compare(password, userExists.password)

    if(!passwordMatch){
      throw new AppError('e-mail ou senha incorreta', 401)
    }

    //jwt
    const { secret, expiresIn} = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(userExists.id),
      expiresIn
    })

    console.log(`usuario logado ${email}`)
    return response.status(200).json({userExists, token})
    
  }
}

module.exports = SessionsController