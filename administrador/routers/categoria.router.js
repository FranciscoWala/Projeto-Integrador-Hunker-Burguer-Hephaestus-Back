
const categoriaController = require('../../controller/usuario/usuario_controller.js')
const { Router } = require('express')

const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const router = express.Router()

router.post('/v1/hephaestus/honkerburguer/categoria', bodyParserJSON, async function(request, response){                      
    let dados = request.body
    let ContentType = request.headers['content-type']

    let result = await categoriaController.inserirUsuario(dados,ContentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/hephaestus/honkerburguer/categoria/:id', async function(request, response){
    let result = await categoriaController.listarUsuario()

    response.status(result.status_code)
    response.json(result)
}) 

router.get('/v1/hephaestus/honkerburguer/categoria/:id', async function(request,response){
    let id = request.params.id
    let result = await categoriaController.buscarUsuario(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/hephaestus/honkerburguer/categoria/:id', bodyParserJSON, async function(request, response){
    let ContentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await categoriaController.atualizarUsuario(dados, id, ContentType)
    response.status(result.status_code)
    
    response.json(result)
})

router.delete('/v1/hephaestus/honkerburguer/categoria/:id', async function(request, response){
    let id = request.params.id
    let result = await categoriaController.deletarUsuario(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router