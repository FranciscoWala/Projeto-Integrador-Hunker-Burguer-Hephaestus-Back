
const usuarioController = require('../controller/usuario/usuario_controller.js')
const { Router } = require('express')

const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const router = express.Router()

router.post('/v1/hephaestus/honkerburguer/usuario', bodyParserJSON, async function(request, response){                      
    let dados = request.body
    let ContentType = request.headers['content-type']

    let result = await usuarioController.inserirUsuario(dados,ContentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/hephaestus/honkerburguer/usuario/:id', async function(request, response){
    let result = await usuarioController.listarUsuario()

    response.status(result.status_code)
    response.json(result)
}) 

router.get('/v1/hephaestus/honkerburguer/usuario/:id', async function(request,response){
    let id = request.params.id
    let result = await usuarioController.buscarUsuario(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/hephaestus/honkerburguer/usuario/:id', bodyParserJSON, async function(request, response){
    let ContentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await usuarioController.atualizarUsuario(dados, id, ContentType)
    response.status(result.status_code)
    
    response.json(result)
})

router.delete('/v1/hephaestus/honkerburguer/usuario/:id', async function(request, response){
    let id = request.params.id
    let result = await usuarioController.deletarUsuario(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router