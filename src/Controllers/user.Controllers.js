class UserController {
    async create (request, response) {
        return response.status(200).json("Deu certo a segunda rota")
}

}

module.exports = UserController;

