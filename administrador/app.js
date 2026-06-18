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

const hamburguerRouter = require('./routers/hamburguer.router')
app.use("/v1/hephaestus/honkerburguer/hamburguer",cors(), hamburguerRouter)


const usuarioRouter = require('./routers/usuario.router')
app.use("/v1/hephaestus/honkerburguer/usuario", cors(), usuarioRouter)


const ingredienteRouter = require('./routers/ingrediente.router')
app.use("/v1/hephaestus/honkerburguer/ingrediente", cors(), ingredienteRouter)

const categoriaRouter = require('./routers/categoria.router')
app.use("/v1/hephaestus/honkerburguer/categoria", cors(), categoriaRouter)


app.listen(8080, () => {
    console.log("API aguardando novas requisições...");
})
