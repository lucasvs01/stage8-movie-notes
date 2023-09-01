const express = require("express"); 
const routes = require("./routes")

const app = express();

const PORT = 4000;

app.use(express.json())/**transforma a resposta em json*/
app.use(routes)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))

/**https://efficient-sloth-d85.notion.site/Aplica-o-em-Node-57bd49ae77b3422fad74f8dde0d06fef -> Notion do app */