const knex = require("../database/knex")
const AppError = require("../Utils/AppError")


class notesControllers {
    async create (request, response){
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        if(rating > 5 || rating < 1){
            throw new AppError("Digite uma nota entre 1 e 5")
        }

       const [note_id] = await knex("movie_notes").insert({
        user_id,
        title,
        description, 
        rating
        })

        const insertTags = tags.map(name => {
            return {
                note_id,
                user_id, 
                name
            }
        })

        console.log(insertTags)
        
        await knex("movie_tags").insert(insertTags)
        
       response.json()
         
    }

    async show (request, response){
        const {id} = request.params;

        const notes = await knex("movie_notes").where({id}).first()
        const tags = await knex("movie_tags").where({note_id: id}).orderBy("name")

        
        response.json({
            ...notes,
            tags
        })
    }

    async delete(request, response){
        const {id} = request.params;

        await knex("movie_notes").where({id}).delete()

        response.json()
    }


}

module.exports = notesControllers;

