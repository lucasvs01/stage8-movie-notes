const knex = require("../database/knex");
const AppError = require("../Utils/AppError");
const { compare } = require("bcrypt")
const authConfigs = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class sessionsControllers {

    async create(request, response){

        const {password, email} = request.body;

       const user =  await knex("users").where({email}).first()

       if(!user){
        throw new AppError("Senha ou email incorreto")
       }

       const compareIfPasswordMatched = await compare(password, user.password);

       if(!compareIfPasswordMatched){
        throw new AppError("Senha ou email incorreto")

       }

       const {secret, expiresIn} = authConfigs.jwt;

       const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn
       })
    
        response.json({user, token})
       
 
    }
}

module.exports = sessionsControllers;