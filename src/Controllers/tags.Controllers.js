const knex = require("../database/knex")
const AppError = require("../Utils/AppError")


class tagsControllers {

    async index (request, response){
        const user_id = request.user.id;

        const tags = await knex("movie_tags").where({user_id}).orderBy("name")

        response.json(tags)

    }

}

module.exports = tagsControllers;

