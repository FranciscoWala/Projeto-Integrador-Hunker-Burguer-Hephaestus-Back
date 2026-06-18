
const categoriaController = require('../controller/categoria/categoria_controller.js')
const { Router } = require('express')

const express = require('express')
const bodyParser = require('body-parser')
const bodyParserJSON = bodyParser.json()

const router = express.Router()

router.post('/', bodyParserJSON, async function(request, response){                      
    let dados = request.body
    let ContentType = request.headers['content-type']

    let result = await categoriaController.inserirNovaCategoria(dados,ContentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response){
    let result = await categoriaController.listarTodosCategorias()

    response.status(result.status_code)
    response.json(result)
}) 

router.get('/:id', async function(request,response){
    let id = request.params.id
    let result = await categoriaController.buscarCategoria(id)
    
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function(request, response){
    let ContentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await categoriaController.atualizarCategoria(dados, id, ContentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response){
    let id = request.params.id
    let result = await categoriaController.excluirCategoria(id)
    
    response.status(result.status_code)
    response.json(result)
})

module.exports = router