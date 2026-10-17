/******************************************************************************
 * Objetivo arquivo responsável pela validação de dados da tabela intermediária cate-
 * goria Hamburguer no banco de dados
 * Data 12/06/26
 * Autor: Francisco Wala
 * Varsão: 1.0.0
 ******************************************************************************/

//Import das mensagens
const configMessages  = require('../modulo/configMensages.js');

const categoriaHamburguerDAO = require('../../model/DAO/categoria_hamburguer/categoria_hamburguer.js')

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
            let erro = JSON.parse(JSON.stringify(configMessages.ERROR_BAD_REQUEST));
            erro.field = '[ID] INVALIDO';
            return erro; 
        } else {
            return false;
        }
    } catch (error) {
        return configMessages.ERROR_NOT_FOUND;
    }
}

async function inserirCategoriaHamburguer(categoriaHamburguer, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarId(categoriaHamburguer)

            if (validar) {
                return validar 
            }else{
                
                let result = await categoriaHamburguerDAO.insertCategoriaHamburguer(categoriaHamburguer)

                if (result) {
                    categoriaHamburguer.id = result
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = categoriaHamburguer

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE 
        }    
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function listarCategoriaHamburguer() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await categoriaHamburguerDAO.selectAllCategoriaHamburguer()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.categoria_hamburguer = result

                return customMessage.DEFAULT_MESSAGE 
            }else{
                return customMessage.ERROR_NOT_FOUND 
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function buscarCategoriaHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == ''|| id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST 
        } else {
            let result = await categoriaHamburguerDAO.selectByIdCategoriaHamburguer(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.hamburguer = result 

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND  
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function buscarCategoriaByIdHamburguer(idHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (idHamburguer == undefined || String(idHamburguer).replaceAll(" ", "") == ''|| idHamburguer == null || isNaN(idHamburguer)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST 
        }else{
            let result = await categoriaHamburguerDAO.selectCategoriaByIdHamburguer(idHamburguer)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.categoria = result
                    
                    return customMessage.DEFAULT_MESSAGE 
                } else {
                    return customMessage.ERROR_NOT_FOUND 
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function buscarHamburguerByIdCategoria(idCategoria) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        if (idCategoria == undefined || String(idCategoria).replaceAll(" ", "") == ''|| idCategoria == null || isNaN(idCategoria)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST 
        } else {
            let result = await categoriaHamburguerDAO.selectHamburguerByIdCategoria(idCategoria)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.hamburgueres = result
                    
                    return customMessage.DEFAULT_MESSAGE 
                } else {
                    return customMessage.ERROR_NOT_FOUND 
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function atualizarCategoriaHamburguer(categoriaHamburguer, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarCategoriaHamburguer(id)
            
            if (resultBusca.status) {
                let validar = await validarId(categoriaHamburguer)

                if (!validar) {
                    categoriaHamburguer.id = Number(id)

                    let result = await categoriaHamburguerDAO.updateCategoriaHamburguer(await tratarDados(categoriaHamburguer))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = categoriaHamburguer

                        return customMessage.DEFAULT_MESSAGE 
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            }else{
                return resultBusca 
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE 
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function excluirCategoriaHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarCategoriaHamburguer(id)

        if (resultBusca.status) {
            let result = await categoriaHamburguerDAO.deleteCategoriaHamburguer(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM    
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return resultBusca
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function excluirCategoriaByIdHamburguer(idHamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    
    try {
        let resultBusca = await buscarCategoriaByIdHamburguer(idHamburguer)

        if (resultBusca.status) {
            let result = await categoriaHamburguerDAO.deleteCategoriaByIdHamburguer(idHamburguer)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBusca
        }
    }catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
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
    buscarHamburguerByIdCategoria,
    buscarCategoriaByIdHamburguer,
    atualizarCategoriaHamburguer,
    excluirCategoriaHamburguer,
    excluirCategoriaByIdHamburguer
}