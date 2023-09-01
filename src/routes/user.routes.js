const { Router } = require("express");

const userRoutes = Router();

userRoutes.get("/", (request, response) => {
    return response.status(200).json("Deu certo a segunda rota")
} );

module.exports = userRoutes;

 