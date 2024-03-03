const path = require("path")
const uploadConfigs = require("../configs/upload")
const fs = require("fs")

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfigs.TMP_FOLDER, file),
            path.resolve(uploadConfigs.UPLOAD_FOLDER, file)
            ) //movendo o arquivo file da pasta TMP_FOLDER para UPLOAD_FOLDER

            return file
        
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfigs.UPLOAD_FOLDER, file)

        try {
            await fs.promises.stat(filePath)
        } catch {
            return
        }

        await fs.promises.unlink(filePath)
    }
}


module.exports = DiskStorage;