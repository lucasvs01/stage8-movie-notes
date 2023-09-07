const AppError = require("../Utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcrypt")


class UserController {
  async create (request, response) {

      const { name, email} = request.body;

      let { password } = request.body;

      password = await hash(password, 8);

      const database = await sqliteConnection();

      const ifEmailExists = await database.get('SELECT email FROM users WHERE email = (?) ', [email])
      const ifNameExists = await database.get('SELECT name FROM users WHERE name = (?) ', [name])

      if(ifEmailExists){
        throw new AppError("Esse e-mail já está em uso.")
      }else if(ifNameExists){
        throw new AppError("Esse nome já está em uso.")
      }

      await database.get('INSERT INTO users (name, email, password) VALUES ((?), (?), (?))', [name, email, password])

      response.status(200).json()

    }
}

module.exports = UserController;

