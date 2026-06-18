const express = require("express")
const cors = require("cors")


const bodyParserJSON = bodyParser.json()

const app = express()
app.use(cors(corsOpitions))


const corsOpitions = {
    origin: ["*"], //configuração  de origem da requisicão (IP ou dominio)
    methods: "GET, POST, PUT, DELETE, OPTIONS", //configiração dos verbos que serão utilizado na API
    allowedHeaders: ["Content-type", "Authorization"] //configuração de permossoes
}


app.listen(8080, () => {
    console.log("API aguardando novas requisições...");
})

module.exports = router 