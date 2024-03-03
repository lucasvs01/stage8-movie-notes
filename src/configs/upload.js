const multer = require("multer")
const {resolve} = require("path")
const crypto = require("crypto")

const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp"); // criando pasta temporaria

const UPLOAD_FOLDER = resolve(TMP_FOLDER, "uploads"); // criando pasta onde a imagem ficara

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");

            const fileNane = `${fileHash}-${file.originalname}`

            return callback(null, fileNane)
        }
    })
}

module.exports = {
    TMP_FOLDER,
    UPLOAD_FOLDER,
    MULTER
}