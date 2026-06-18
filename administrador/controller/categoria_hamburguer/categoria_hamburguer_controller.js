/******************************************************************************
 * Objetivo arquivo responsável pela validação de dados da tabela intermediária cate-
 * goria Hamburguer no banco de dados
 * Data 12/06/26
 * Autor: Francisco Wala
 * Varsão: 1.0.0
 ******************************************************************************/

//Import das mensagens
const configMessages = require('../modulo/configMensages.js')

//Import do DAO
const categoriaHamburguerDAO = require('../../model/DAO/categoria_hamburguer/categoria_hamburguer.js')
//Import de body parser para abrir os pacotes que chegam para a API
const { json } = require('body-parser')

const validarId = async function (categoriaHamburguer) {

    try {
        if (categoriaHamburguer.id_hamburguer == undefined ||
            categoriaHamburguer.id_hamburguer == null ||
            String(categoriaHamburguer.id_hamburguer).trim() == '' ||
            isNaN(categoriaHamburguer.id_hamburguer) ||
            categoriaHamburguer.id_hamburguer <= 0 ||
            categoriaHamburguer.id_categoria == undefined ||
            categoriaHamburguer.id_categoria == null ||
            String(categoriaHamburguer.id_categoria).trim() == '' ||
            isNaN(categoriaHamburguer.id_categoria) ||
            categoriaHamburguer.id_categoria <= 0
        ) {
            return false
        } else {
            return configMessages.field = '[ID] INVALIDO'
        }
    } catch (error) {
        console.log(`Erro na controller erro: ${error}`)
        return custumMessage.ERROR_NOT_FOUND //Retorna um 404
    }
}

async function inserirCategoriaHamburguer(categoriaHamburguer, contentType) {
    //Cria uma cópia dos JSON do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(categoriaHamburguer)

            if (validar) {
                return validar // retorna 400
            }else{
                
                let result = await categoriaHamburguerDAO.insertCategoriaHamburguer(await tratarDados(categoriaHamburguer))

                if (result) {
                    
                    categoriaHamburguer.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = categoriaHamburguer

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

async function listarCategoriaHamburguer() {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await categoriaHamburguerDAO.selectAllCategoriaHamburguer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.categoriaHamburguer = result

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

async function buscarCategoriaHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == ''|| id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        } else {
            let result = await categoriaHamburguerDAO.seletByIdCategoriaHamburguer(id)

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

async function buscarCategoriaByIdHamburguer(idHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (idHamburguer == undefined || String(idHamburguer).replaceAll(" ", "") == ''|| idHamburguer == null || isNaN(idHamburguer)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST //400
        }else{
            let result = await categoriaHamburguerDAO.selectCategoriaByIdHamburguer(idHamburguer)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.categoria = result
                    
                    return customMessage.DEFAULT_MESSAGE //200
                } else {
                    return customMessage.ERROR_NOT_FOUND //404
                }
            } else {
                return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 [MODEL]
            }
        }
    } catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER // 500 [CONTROLLER]
    }
}

async function atualizarCategoriaHamburguer(categoriaHamburguer, id, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarCategoriaHamburguer(id)
            
            if (resultBusca.status) {
                let validar = await validarDados(categoriaHamburguer)

                if (!validar) {
                    categoriaHamburguer.id = Number(id)

                    let result = await categoriaHamburguerDAO.updateCategoriaHamburguer(await tratarDados(categoriaHamburguer))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = categoriaHamburguer

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

async function excluirCategoriaHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarCategoriaHamburguer(id)

        if (resultBusca.status) {
            let result = await categoriaHamburguerDAO.deleteCategoriaHamburguer(id)

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

async function excluirCategoriaByIdHamburguer(idHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarCategoriaByIdHamburguer(idHamburguer)

        if (resultBusca.status) {
            let result = await categoriaHamburguerDAO.deleteCategoriaByIdHamburguer(idHamburguer)

            if (result) {
                return customMessage.SUCESS_DELETED_ITEM
            } else {
                return customMessage.INTERNAL_SERVER_ERROR_MODEL //500 [MODEL]
            }
        }else{
            return resultBusca
        }
    }catch (error) {
        return customMessage.INTERNAL_SERVER_ERROR_CONTROLLER //500 [CONTROLLER]
    }
}

async function tratarDados(categoriaHamburguer) {
    categoriaHamburguer.id_categoria = categoriaHamburguer.id_categoria.replaceAll("'", "")
    categoriaHamburguer.id_hamburguer = categoriaHamburguer.id_hamburguer.replaceAll("'", "")

    return categoriaHamburguer
}

module.exports = {
    inserirCategoriaHamburguer,
    listarCategoriaHamburguer,
    buscarCategoriaHamburguer,
    atualizarHamburguer,
    excluirCategoriaHamburguer
}