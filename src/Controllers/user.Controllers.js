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

  async update (request, response) {
    const user_id = request.user.id;
    const { name, email, password, old_password} = request.body;
    const database = await sqliteConnection(); 

    const user = await database.get("SELECT * FROM users WHERE id=(?)", [user_id])

    if(!user){
      throw new AppError("Esse usuário não existe.")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email=(?)", [email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("Esse email já está em uso")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(!old_password){
      throw new AppError("Digite a senha antiga para conseguir atualizar a senha.")
    }

    if(password && old_password){
      const checkPassword = await compare(old_password, user.password)

      if(!checkPassword){
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 8)
    }

      await database.run("UPDATE users SET name=(?), email=(?), update_at= DATETIME('now'), password=(?) WHERE id=(?)", [name, email,user.password, user_id])

    response.json()

  }
}

module.exports = UserController;

