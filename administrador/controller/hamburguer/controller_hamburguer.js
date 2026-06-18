/******************************************************
 * Objetivo: arquivo responsável pela validação, tratamento e manipulação
*  de dados para realizar o CRUD de hamburguer
 * Data: 12/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
*/

//Import do DAO
const hamburguerDAO = require('../../model/DAO/hamburguer/hamburguer.js')

//import da controller de categoriaHamburguer
const categoriaHamburguerController = require('../categoria_hamburguer/categoria_hamburguer_controller.js')

//import da controller de categoriaHamburguer
const ingredienteHamburguerController = require('./controller_ingrediente_hamburguer.js')

//Import das mensagens
const configMessages = require('../modulo/configMensages.js')
const {json} = require('body-parser')

async function inserirNovoHamburguer(hamburguer, contentType) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(hamburguer)

            if (validar) {
                return validar // retorna 400
            }else{
                
                let result = await hamburguerDAO.insertHamburguer(await tratarDados(hamburguer))

                if (result) {
                    hamburguer.id = result

                    for (itemCategoria of hamburguer.categoria) {
                        let categoriaHamburguer = {
                            "id_hamburguer": hamburguer.id,
                            "id_categoria": categoria.id
                        }

                        let resultCategoriaHamburguer = await categoriaHamburguerController.inserirCategoriaHamburguer(categoriaHamburguer)

                        if (resultCategoriaHamburguer.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                        }

                    }

                    for (itemIngrediente of hamburguer.ingrediente) {
                        let ingredienteHamburguer = {
                            "id_hamburguer": hamburguer.id,
                            "id_ingrediente": ingrediente.id
                        }

                        let resultIngredienteHamburguer = await ingredienteHamburguerController.inserirNovoIngredienteHamburguer(ingredienteHamburguer)

                        if (resultIngredienteHamburguer.status) {
                            return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                        }

                    }                  

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = hamburguer

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

async function listarHamburgeres() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await hamburguerDAO.selectAllHamburguer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.hamburguer = result

                return customMessage.DEFAULT_MESSAGE // 200
            }else{
                customMessage.ERROR_NOT_FOUND //404
            }
        }else{
            customMessage.INTERNAL_SERVER_ERROR_MODEL // 500 (MODEL)
        }
    } catch (error) {
        customMessage.INTERNAL_SERVER_ERROR_CONTROLLER //500 (CONTROLLER)
    }
}

async function buscarHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == ''|| id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await hamburguerDAO.selectByIDHamburguer(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.hamburguer = result 

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

async function atualizarHamburguer(hamburguer, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarHamburguer(id)
            
            if (resultBusca.status) {
                let validar = await validarDados(hamburguer)

                if (!validar) {
                    hamburguer.id = Number(id)

                    let result = await hamburguerDAO.updateHamburguer(await tratarDados(hamburguer))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = hamburguer

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
        customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 (CONTROLLER)
    }
}

async function excluirHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarHamburguer(id)

        if (resultBusca.status) {
            let result = await hamburguerDAO.deleteHamburguer(id)

            if (result) {
                return customMessage.SUCESS_DELETED_ITEM    
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

async function validarDados(hamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (hamburguer.nome == undefined || hamburguer.nome == null || hamburguer.nome == "" || hamburguer.length > 45) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if(hamburguer.preco == undefined || hamburguer.preco == null || isNaN(hamburguer.preco) || hamburguer.preco.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[PRECO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(hamburguer.foto == undefined || hamburguer.foto == null || hamburguer.foto == "" || hamburguer.foto.length > 250){
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else if(hamburguer.descricao == undefined || hamburguer.descricao == "" || hamburguer.descricao == null){
        customMessage.ERROR_BAD_REQUEST.fiel = '[DESCRICAO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

async function tratarDados(hamburguer) {
    hamburguer.nome = hamburguer.nome.replaceAll("'", "")
    hamburguer.preco = hamburguer.preco.replaceAll("'", "")
    hamburguer.foto = hamburguer.foto.replaceAll("'", "")
    hamburguer.descricao = hamburguer.descricao.replaceAll("'", "")

    return hamburguer
}

module.exports = {
    inserirNovoHamburguer,
    listarHamburgeres,
    buscarHamburguer,
    atualizarHamburguer,
    excluirHamburguer
}