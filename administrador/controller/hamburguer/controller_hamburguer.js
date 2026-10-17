/******************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação
 * de dados para realizar o CRUD de hamburguer
 * Data: 12/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
 */

const hamburguerDAO = require('../../model/DAO/hamburguer/hamburguer.js')
const categoriaHamburguerController = require('../categoria_hamburguer/categoria_hamburguer_controller.js')
const ingredienteHamburguerController = require('./controller_ingrediente_hamburguer.js')
const configMessages = require('../modulo/configMensages.js')

async function inserirNovoHamburguer(hamburguer, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let validar = await validarDados(hamburguer)

            if (validar) {
                return validar // retorna 400
            } else {
                let result = await hamburguerDAO.insertHamburguer(hamburguer)

                if (result) {
                    hamburguer.id = result
                    let teveAviso = false;

                    // Tratamento das categorias usando IF padrão (sem operador ternário)
                    let listaCategorias = [];
                    if (hamburguer.categorias) {
                        listaCategorias = hamburguer.categorias;
                    } else if (hamburguer.categoria) {
                        listaCategorias = hamburguer.categoria;
                    }

                    for (let itemCategoria of listaCategorias) {
                        let categoriaHamburguer = {
                            "id_hamburguer": hamburguer.id,
                            "id_categoria": itemCategoria.id
                        }

                        let resultCategoriaHamburguer = await categoriaHamburguerController.inserirCategoriaHamburguer(categoriaHamburguer, 'application/json')

                        if (resultCategoriaHamburguer.status == false) {
                            teveAviso = true;
                        }
                    }

                    let listaIngredientes = [];
                    if (hamburguer.ingredientes) {
                        listaIngredientes = hamburguer.ingredientes;
                    } else if (hamburguer.ingrediente) {
                        listaIngredientes = hamburguer.ingrediente;
                    }

                    for (let itemIngrediente of listaIngredientes) {
                        let ingredienteHamburguer = {
                            "id_hamburguer": hamburguer.id,
                            "id_ingrediente": itemIngrediente.id
                        }

                        let resultIngredienteHamburguer = await ingredienteHamburguerController.inserirNovoIngredienteHamburguer(ingredienteHamburguer, 'application/json')

                        if (resultIngredienteHamburguer.status == false) {
                            teveAviso = true;
                        }
                    }

                    if (teveAviso == true) {
                        return customMessage.SUCCESS_CREATED_ITEM_WARNING;
                    } else {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response.hamburguer = hamburguer

                        return customMessage.DEFAULT_MESSAGE
                    }
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (MODEL)
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE //retorna 415
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (CONTROLLER)
    }
}

async function listarHamburgeres() {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await hamburguerDAO.selectAllHamburguer()

        if (result) {
            if (result.length > 0) {

                for (let i = 0; i < result.length; i++) {
                    let idHamburguer = result[i].id;

                    let resultIngredientes = await ingredienteHamburguerController.buscarIngredienteIDHamburguer(idHamburguer);
                    if (resultIngredientes.status == true) {
                        result[i].ingredientes = resultIngredientes.response.ingrediente_hamburguer;
                    } else {
                        result[i].ingredientes = [];
                    }

                    let resultCategorias = await categoriaHamburguerController.buscarCategoriaByIdHamburguer(idHamburguer);
                    if (resultCategorias.status == true) {
                        result[i].categorias = resultCategorias.response.categoria;
                    } else {
                        result[i].categorias = [];
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.hamburguer = result

                return customMessage.DEFAULT_MESSAGE // 200
            } else {
                return customMessage.ERROR_NOT_FOUND // 404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (MODEL)
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (CONTROLLER)
    }
}

async function buscarHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(" ", "") == '' || id == null || isNaN(id)) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVALIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await hamburguerDAO.selectByIDHamburguer(id)

            if (result) {
                if (result.length > 0) {
                    let resultIngredientes = await ingredienteHamburguerController.buscarIngredienteIDHamburguer(id);
                    if (resultIngredientes.status == true) {
                        result[0].ingredientes = resultIngredientes.response.ingrediente_hamburguer;
                    } else {
                        result[0].ingredientes = []; 
                    }

                    let resultCategorias = await categoriaHamburguerController.buscarCategoriaByIdHamburguer(id);
                    if (resultCategorias.status == true) {
                        result[0].categorias = resultCategorias.response.categoria;
                    } else {
                        result[0].categorias = [];
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.hamburguer = result

                    return customMessage.DEFAULT_MESSAGE
                } else {
                    return customMessage.ERROR_NOT_FOUND // 404 
                }
            } else {
                 return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (CONTROLLER)
    }
}

async function atualizarHamburguer(hamburguer, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let resultBusca = await buscarHamburguer(id)

            if (resultBusca.status == true) {
                let validar = await validarDados(hamburguer)

                if (validar == false) {
                    hamburguer.id = Number(id)
                    let hamburguerTratado = await tratarDados(hamburguer)
                    let result = await hamburguerDAO.updateHamburguer(hamburguerTratado)

                    if (result) {
                        await ingredienteHamburguerController.excluirIngredienteHamburguer(id)
                        
                        let listaIngredientes = [];
                        if (hamburguer.ingredientes) {
                            listaIngredientes = hamburguer.ingredientes;
                        } else if (hamburguer.ingrediente) {
                            listaIngredientes = hamburguer.ingrediente;
                        }

                        for (let itemIngrediente of listaIngredientes) {
                            let ingredienteHamburguer = {
                                "id_hamburguer": hamburguer.id,
                                "id_ingrediente": itemIngrediente.id
                            }
                            await ingredienteHamburguerController.inserirNovoIngredienteHamburguer(ingredienteHamburguer, contentType)
                        }

                        await categoriaHamburguerController.excluirCategoriaByIdHamburguer(id)
                        
                        let listaCategorias = [];
                        if (hamburguer.categorias) {
                            listaCategorias = hamburguer.categorias;
                        } else if (hamburguer.categoria) {
                            listaCategorias = hamburguer.categoria;
                        }

                        for (let itemCategoria of listaCategorias) {
                            let categoriaHamburguer = {
                                "id_hamburguer": hamburguer.id,
                                "id_categoria": itemCategoria.id
                            }
                            await categoriaHamburguerController.inserirCategoriaHamburguer(categoriaHamburguer, contentType)
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.response = hamburguer

                        return customMessage.DEFAULT_MESSAGE 
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validar
                }
            } else {
                return resultBusca
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function excluirHamburguer(id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBusca = await buscarHamburguer(id)

        if (resultBusca.status == true) {
            await ingredienteHamburguerController.excluirIngredienteHamburguer(id)
            await categoriaHamburguerController.excluirCategoriaByIdHamburguer(id)

            let result = await hamburguerDAO.deleteHamburguer(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (MODEL)
            }
        } else {
            return resultBusca
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (CONTROLLER)
    }
}

async function validarDados(hamburguer) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (hamburguer.nome == undefined || hamburguer.nome == null || hamburguer.nome == "" || hamburguer.nome.length > 45) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (hamburguer.preco == undefined || hamburguer.preco == null || isNaN(hamburguer.preco)) {
        customMessage.ERROR_BAD_REQUEST.field = '[PRECO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (hamburguer.foto == undefined || hamburguer.foto == null || hamburguer.foto == "" || hamburguer.foto.length > 250) {
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else if (hamburguer.descricao == undefined || hamburguer.descricao == "" || hamburguer.descricao == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[DESCRICAO] INVALIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

async function tratarDados(hamburguer) {
    hamburguer.nome = hamburguer.nome.replaceAll("'", "")
    hamburguer.preco = String(hamburguer.preco).replaceAll("'", "")
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