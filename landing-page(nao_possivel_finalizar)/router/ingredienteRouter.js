/* *********************************************************************
* Objective    : Rotas da 'tbl_ingrediente'
* Date         : 2026-06-12
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// ---| Configurações Básicas |--- 

const express = require('express')
const router  = express.Router()

const bodyParser     = require('body-parser')
const bodyParserJSON = bodyParser.json()

const controllerIngrediente = require('../controller/ingrediente/ingredienteController.js')

/*
    Endpoint 1 - Adiciona cadastro de um novo Ingrediente
    Método: POST 
*/
router.post('/', bodyParserJSON, async function(request, response){

    let objectIngrediente = request.body                                                                        
    let contentType       = request.headers['content-type']                                                    
    let result            = await controllerIngrediente.inserirIngrediente(objectIngrediente, contentType)  
    
    response.status(result.status_code)
    response.json(result)
})

/*
    Endpoint 2 - Lista todos os cadastro do Ingrediente
    Método: GET 
*/
router.get('/', async function(request, response){

    let result = await controllerIngrediente.listarIngrediente()
    
    response.status(result.status_code)
    response.json(result) 
})

/*
    Endpoint 3 - Retorna um Ingrediente usando | filtro: ID
    Método: GET 
*/
router.get('/:id', async function(request, response){

    let id     = request.params.id
    let result = await controllerIngrediente.buscarIngrediente(id)

    response.status(result.status_code)
    response.json(result)
})

/*
    Endpoint 4 - Retorna o Ingrediente atualizado usando | filtro: ID
    Método: PUT
*/
router.put('/:id', bodyParserJSON, async function(request, response){
    
    let id                = request.params.id
    let contentType       = request.headers['content-type'] 
    let objectIngrediente = request.body

    let result            = await controllerIngrediente.atualizarIngrediente(id, contentType, objectIngrediente)

    response.status(result.status_code)
    response.json(result)
})


/*
    Endpoint 5 - Exclui o Ingrediente usando | filtro: ID
    Método: DELETE
*/
router.delete('/:id', async function(request, response) {
    
    let id      = request.params.id
    let result  = await controllerIngrediente.excluirIngrediente(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router