const knex = require("../database/knex")
const AppError = require("../Utils/AppError")


class notesControllers {
    async create (request, response){
        const  user_id  = request.user.id;
        const { title, description, rating, tags } = request.body;


        if(rating > 5 || rating < 0){
            throw new AppError("Digite uma nota entre 0 e 5")
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
        const { title } = request.query;

        const user_id = request.user.id;
        let notes;


        if(title === undefined){

                notes = await knex("movie_notes").where({user_id}).orderBy("title")
                
        }else{
            notes = await knex("movie_notes").where({user_id}).orderBy("title").whereLike("title", `%${title}%`)
        }
        

        
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

