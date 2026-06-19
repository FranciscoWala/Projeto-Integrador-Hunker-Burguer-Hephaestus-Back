const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const bodyParserJSON = bodyParser.json()

const app = express()

const corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, DELETE, OPTIONS", 
    allowedHeaders: ["content-type", "authorization", "accept"]
}

app.use(cors(corsOptions))

const hamburguerRouter = require('./routers/hamburguer.router')
app.use("/v1/hephaestus/honkerburguer/hamburguer", hamburguerRouter)

const usuarioRouter = require('./routers/usuario.router')
app.use("/v1/hephaestus/honkerburguer/usuario", usuarioRouter)

const ingredienteRouter = require('./routers/ingrediente.router')
app.use("/v1/hephaestus/honkerburguer/ingrediente", ingredienteRouter)

const categoriaRouter = require('./routers/categoria.router')
app.use("/v1/hephaestus/honkerburguer/categoria", categoriaRouter)

app.listen(8080, () => {
    console.log("API aguardando novas requisições...");
})