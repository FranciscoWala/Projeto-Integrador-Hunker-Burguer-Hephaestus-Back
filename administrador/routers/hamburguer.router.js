
const hamburguerController = require('../controller/hamburguer/controller_hamburguer.js')
const { Router } = require('express')

const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const router = express.Router()

router.post('/v1/hephaestus/honkerburguer/hamburguer', bodyParserJSON, async function(request, response){                      
    let dados = request.body
    let ContentType = request.headers['content-type']

    let result = await hamburguerController.inserirNovoHamburguer(dados,ContentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/v1/hephaestus/honkerburguer/hamburguer/:id', async function(request, response){
    let result = await hamburguerController.listarHamburgeres()

    response.status(result.status_code)
    response.json(result)
}) 

router.get('/v1/hephaestus/honkerburguer/hamburguer/:id', async function(request,response){
    let id = request.params.id
    let result = await hamburguerController.buscarHamburguer(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/v1/hephaestus/honkerburguer/hamburguer/:id', bodyParserJSON, async function(request, response){
    let ContentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await hamburguerController.atualizarHamburguer(dados, id, ContentType)
    response.status(result.status_code)
    
    response.json(result)
})

router.delete('/v1/hephaestus/honkerburguer/hamburguer/:id', async function(request, response){
    let id = request.params.id
    let result = await hamburguerController.excluirHamburguer(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router