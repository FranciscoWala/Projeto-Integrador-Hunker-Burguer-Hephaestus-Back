/******************************************************
 * Objetivo: arquivo responsável pela validação, tratamento e manipulação
*  de dados para realizar o CRUD de ingrediente
 * Data: 16/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
*/

//Import do DAO
const ingredienteDAO = require('../../model/DAO/ingrediente/ingrediente.js')

//Import das mensagens
const configMessages = require('../modulo/configMensages.js')
const {json} = require('body-parser')

async function inserirNovoIngrediente(ingrediente, contentType) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(ingrediente)

            if (validar) {
                return validar // retorna 400
            }else{
                
                let result = await ingredienteDAO.insertIngrediente(ingrediente)

                if (result) {
                    
                    ingrediente.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ingrediente

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 (MODEL)
                }
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE //retorna 415
        }    
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER //500 (CONTROLLER)
    }
}

async function listarIngredientes() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await ingredienteDAO.selectAllIngrediente()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ingrediente = result

                return customMessage.DEFAULT_MESSAGE // 200
            }else{
                return customMessage.ERROR_NOT_FOUND //404
            }
        }else{
            return customMessage.INTERNAL_SERVER_ERROR_MODEL // 500 (MODEL)
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER //500 (CONTROLLER)
    }
}

async function buscarIngrediente(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == ''|| id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await ingredienteDAO.selectByIDIngrediente(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ingrediente = result 

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND // 404 
                }
            }else{
                return customMessage.INTERNAL_SERVER_ERROR_MODEL // 500 (MODEL)
            }
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 (CONTROLLER)
    }
}

async function atualizarIngrediente(ingrediente, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarIngrediente(id)
            
            if (resultBusca.status) {
                let validar = await validarDados(ingrediente)

                if (!validar) {
                    ingrediente.id = Number(id)

                    let result = await ingredienteDAO.updateIngrediente(ingrediente)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = ingrediente

                        return customMessage.DEFAULT_MESSAGE //200
                    } else {
                        return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 (MODEL)
                    }
                } else {
                    return validar
                }
            }else{
                return resultBusca //400 500 404
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 (CONTROLLER)
    }
}

async function excluirIngrediente(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarIngrediente(id)

        if (resultBusca.status) {
            let result = await ingredienteDAO.deleteIngrediente(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM    
            } else {
                return customMessage.INTERNAL_SERVER_ERROR_MODEL // 500 (MODEL)
            }
        } else {
            return resultBusca
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 (CONTROLLER)
    }
}

async function validarDados(ingrediente) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (ingrediente.nome == undefined || ingrediente.nome == null || ingrediente.nome == "" || ingrediente.nome.length > 45) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if(ingrediente.preco == undefined || ingrediente.preco == null || isNaN(ingrediente.preco) || ingrediente.preco.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[PRECO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(ingrediente.foto == undefined || ingrediente.foto == null || ingrediente.foto == "" || ingrediente.foto.length > 250){
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

async function tratarDados(ingrediente) {
    ingrediente.nome = ingrediente.nome.replaceAll("'", "")
    ingrediente.preco = ingrediente.preco.replaceAll("'", "")
    ingrediente.foto = ingrediente.foto.replaceAll("'", "")

    return ingrediente
}

module.exports = {
    inserirNovoIngrediente,
    listarIngredientes,
    buscarIngrediente,
    atualizarIngrediente,
    excluirIngrediente
}