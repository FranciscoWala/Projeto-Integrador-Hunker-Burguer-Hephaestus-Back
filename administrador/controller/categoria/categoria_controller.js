/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de categorias.
 * Autor: Gabriel
 * Versão: 1.0.0
 * Data: 12/06/2026
 ************************************************************************************************************/

const { mensagem } = require('../modulo/configMessagesGabriel.js');
const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const categoriaDAO = require('../../model/dao/categoria/categoria.js');

const regras = {
    categoria: { necessario: true, minimo: 1, maximo: 15, tipo: 'string' },
    foto: { necessario: true, minimo: 1, maximo: 250, tipo: 'string' }
};

const inserirNovaCategoria = async function (categoria, contentType) {
    try {
        let resultValidar = validar.DADOS(categoria, regras, contentType);

        if (resultValidar == false) {
            let result = await categoriaDAO.insertCategoria(tratar.DADOS(categoria));

            if (result) {
                categoria.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(categoria);
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const atualizarCategoria = async function (categoria, id, contentType) {
    try {
        let resultValidar = validar.DADOS(categoria, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarCategoria = await buscarCategoria(id);

            if (resultBuscarCategoria.status == true) {
                categoria.id = id;

                let resultValidarId = validar.ID(id);

                if (resultValidarId == false) {
                    let result = await categoriaDAO.updateCategoria(tratar.DADOS(categoria));

                    if (result) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(categoria);
                    } else {
                        return mensagem.ERRO_MODEL();
                    }
                } else {
                    return resultValidarId
                }
            } else {
                return resultBuscarCategoria;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosCategorias = async function () {
    try {
        let result = await categoriaDAO.selectAllCategoria();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, 'categorias');
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL();
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarCategoria = async function (id) {
    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await categoriaDAO.selectCategoriaById(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, 'categoria');
                } else {
                    return mensagem.ERRO_NADA_ENCONTRADO();
                }
            } else {
                return mensagem.ERRO_MODEL();
            }
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const excluirCategoria = async function (id) {
    try {
        let resultBuscarCategoria = await buscarCategoria(id);

        if(resultBuscarCategoria.status) {
            let result = await categoriaDAO.deleteCategoria(id);

            if(result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarCategoria;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovaCategoria,
    atualizarCategoria,
    listarTodosCategorias,
    buscarCategoria,
    excluirCategoria
};