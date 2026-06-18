/******************************************************
 * Objetivo: arquivo responsável pela validação, tratamento e manipulação
*  de dados para realizar o CRUD da tabela intermediária ingrediente_hamburguer
 * Data: 17/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
*/

//Import do DAO
const ingredienteHamburguerDAO = require('../../model/DAO/ingrediente_hamburguer/ingrediente_hamburguer.js')

//Import das mensagens
const configMessages = require('../modulo/configMensages.js')
const {json} = require('body-parser')

async function inserirNovoIngredienteHamburguer(ingredienteHamburguer, contentType) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(ingredienteHamburguer)

            if (validar) {
                return validar // retorna 400
            }else{
                
                let result = await ingredienteHamburguerDAO.insertIngredienteHamburguer

                if (result) {
                    
                    hamburguer.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ingredienteHamburguer

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

async function listarIngredienteHamburger() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await ingredienteHamburguerDAO.selectAllIngredienteHamburguer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ingrediente_hamburguer = result

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

async function buscarIngredienteHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == ''|| id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await ingredienteHamburguerDAO.selectByIDIngredienteHamburguer(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ingrediente_hamburguer = result 

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

async function atualizarHamburguer(ingredienteHamburguer, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarHamburguer(id)
            
            if (resultBusca.status) {
                let validar = await validarDados(ingredienteHamburguer)

                if (!validar) {
                    hamburguer.id = Number(id)

                    let result = await ingredienteHamburguerDAO.updateIngredienteHamburguer(ingredienteHamburguer)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = ingredienteHamburguer

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

async function excluirIngredienteHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarIngredienteHamburguer(id)

        if (resultBusca.status) {
            let result = await ingredienteHamburguerDAO.deleteIngredienteHamburguer(id)

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

async function validarDados(ingredienteHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (ingredienteHamburguer.id_ingrediente == undefined || ingredienteHamburguer.id_ingrediente == null || ingredienteHamburguer.id_ingrediente == "") {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_INGREDIENTE] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if(ingredienteHamburguer.id_hamburguer == undefined || ingredienteHamburguer.id_hamburguer == null || isNaN(ingredienteHamburguer.id_hamburguer)) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_HAMBURGUER] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

async function buscarIngredienteIDHamburguer(idHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idHamburguer == undefined || String(idHamburguer).replaceAll(" ", "") == ''|| idHamburguer == null || isNaN(idHamburguer)) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_HAMBURGUER] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        }else{
            let result = await ingredienteHamburguerDAO.selectIngredienteByIDHamburguer(idHamburguer)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ingrediente_hamburguer = result

                    return customMessage.DEFAULT_MESSAGE //200
                }else{
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 [MODEL]
            }
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER //500 [CONTROLLER]
    }
}

async function buscarHamburguerIDIngrediente(idIngrediente) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (idIngrediente == undefined || String(idIngrediente).replaceAll(" ", "") == ''|| idIngrediente == null || isNaN(idIngrediente)) {
            customMessage.ERROR_BAD_REQUEST.field = "[ID_INGREDIENTE] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400
        }else{
            let result = await ingredienteHamburguerDAO.selectHamburguerByIDIngrediente(idIngrediente)

            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.ingrediente_hamburguer = result

                return customMessage.DEFAULT_MESSAGE //200
            } else {
                return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 [MODEL]
            }
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 [CONTROLLER]
    }
}

async function tratarDados(ingredienteHamburguer) {
    ingredienteHamburguer.id_ingrediente = ingredienteHamburguer.id_ingrediente.replaceAll("'", "")
    ingredienteHamburguer.id_hamburguer = ingredienteHamburguer.id_hamburguer.replaceAll("'", "")

    return ingredienteHamburguer
}

module.exports = {
    inserirNovoIngredienteHamburguer,
    listarIngredienteHamburger,
    buscarIngredienteHamburguer,
    atualizarHamburguer,
    excluirIngredienteHamburguer,
    buscarIngredienteIDHamburguer,
    buscarHamburguerIDIngrediente
}