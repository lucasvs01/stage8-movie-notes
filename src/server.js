 require("express-async-errors")// Biblioteca que cuida do tratamento dos erros
 require("dotenv/config")

const express = require("express"); 

const routes = require("./routes")

const cors = require("cors")

const appError = require("./Utils/AppError")

const migrationsRun = require("./database/sqlite/migrations");
const  uploadConfigs  = require("./configs/upload");

const app = express();

const PORT = process.env.PORT || 5000;

migrationsRun() 

app.use(express.json())/**transforma a resposta em json*/

app.use("/files", express.static(uploadConfigs.UPLOAD_FOLDER))

app.use(cors())

app.use(routes)


app.use((error, request , response, next) => {
    if(error instanceof appError){ /**Erro do user */
        return response.status(error.statusCode).json({
            status: "Error",
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({ /**Erro do server */
        status: "Error",
        message: "Internal server error"
    })
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))


/**https://efficient-sloth-d85.notion.site/Aplica-o-em-Node-57bd49ae77b3422fad74f8dde0d06fef -> Notion do app */