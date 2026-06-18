
const ingredienteController = require('../../landing-page/controller/ingrediente/ingredienteController.js')
const { Router } = require('express')

const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const router = express.Router()

router.post('/', bodyParserJSON, async function(request, response){                      
    let dados = request.body
    let ContentType = request.headers['content-type']

    let result = await ingredienteController.inserirIngrediente(dados,ContentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await ingredienteController.listarIngrediente()

    response.status(result.status_code)
    response.json(result)
}) 

router.get('/:id', async function(request,response){
    let id = request.params.id
    let result = await ingredienteController.buscarIngrediente(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let ContentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await ingredienteController.atualizarIngrediente(dados, id, ContentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    let result = await ingredienteController.excluirIngrediente(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router