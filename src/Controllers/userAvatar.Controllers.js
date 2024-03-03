const AppError = require("../Utils/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../provider/diskStorage")

class userAvatarController{
    async update(request, response){
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;
        const diskStorage = new DiskStorage();
        const user = await knex("users").where({id: user_id}).first();
        
        if(!user){
            throw new AppError("Somente usuarios autenticados podem atualizar o avatar", 401)
        }

        

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)

        
        user.avatar = filename;

        await knex("users").where({id: user_id}).update(user)

        response.json(user);

        

        
    }
}

module.exports = userAvatarController;