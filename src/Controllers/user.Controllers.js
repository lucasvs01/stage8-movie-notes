const AppError = require("../Utils/AppError");

class UserController {
  create (request, response) {

        const { name, email } = request.body;
        const { user_id } = request.params;

        if(!name) {
           throw new AppError("O nome é obrigatório")
        }

        return response.status(200).json({
            "name": name,
            "email": email,
            "user_id": user_id
        })


    }
}

module.exports = UserController;

