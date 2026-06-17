const express = require("express")
const cors = require("cors")


const bodyParserJSON = bodyParser.json()

const app = express()

const corsOpitions = {
    origin: ["*"], //configuração  de origem da requisicão (IP ou dominio)
    methods: "GET, POST, PUT, DELETE, OPTIONS", //configiração dos verbos que serão utilizado na API
    allowedHeaders: ["Content-type", "Authorization"] //configuração de permossoes
}

app.use(cors(corsOpitions))

module.exports = routers