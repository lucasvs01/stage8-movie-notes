require("express-async-errors");

const express = require("express"); 

const routes = require("./routes")

const appError = require("./Utils/AppError")

const app = express();

const PORT = 4000;

app.use(express.json())/**transforma a resposta em json*/
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