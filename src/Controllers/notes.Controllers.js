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

    async index (request, response){
        const { user_id, title, tags } = request.query;

        let notes;

        if(tags){
            const filteredTags = tags.split(",").map(tag => tag)

            notes = await knex("movie_tags")
            .select("movie_notes.id",
            "movie_notes.title",
            "movie_notes.user_id")
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.title", `%${title}%`)
            .whereIn("name", filteredTags)
            .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
            .orderBy("movie_notes.title")

        }else(
            notes = await knex("movie_notes").where({user_id}).orderBy("title").whereLike("title", `%${title}%`)
        )
        
        const userTags = await knex("movie_tags").where({user_id})
        const notesWithTags = notes.map(note => {
            const notesTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: notesTags
            }
        })

        response.json(notesWithTags)
    }


}

module.exports = notesControllers;

