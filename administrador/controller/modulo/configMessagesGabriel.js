/***********************************************************************************************
 * Objetivo: Arquivo responsável pela padronização das mensagens e status code
 *           do projeto de filmes.
 * Data: 17/04/2026
 * Autor: Gabriel
 * Versão: 1.0.17.4
 **********************************************************************************************/

//Padronização dos retornos da API (Cabeçalho)
const DEFAULT_MESSAGE = {
    api_description: 'API para controlar o projeto de Filmes 🎥.',
    development: 'Hephaestus',
    version: '1.0.17.4',
    status: false,
    status_code: 0,
    response: {}
};

//Mensagens de erro do projeto de filmes
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Não foi possivel processar a requisição devido a erros de entrada de dados 😣.',
    image: 'https://http.dog/400.jpg',
};

//Mensagens de sucesso do projeto de Filmes
const SUCESS_CREATE_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso 🥳.',
    image: 'https://http.dog/201.jpg',
};

const SUCCESS_RESPONSE = {
    status: true,
    status_code: 200,
    image: 'https://http.dog/200.jpg'
};

const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item atualizado com sucesso 🥳',
    image: 'https://http.dog/200.jpg'
};

const SUCCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item excluido com sucesso 🥳',
    image: 'https://http.dog/200.jpg'
};

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor. 🤖 [MODEL].',
    image: 'https://http.dog/500.jpg'
};

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor. 🤖 [CONTROLLER].',
    image: 'https://http.dog/500.jpg'
};

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o formato de dados ecaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON. 🤖',
    image: 'https://http.dog/415.jpg'
};

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados para retorno. 🗺️❌',
    image: 'https://http.dog/404.jpg'
};

/**
 * Objeto que trata das mensagens de resposta da API
 */
const mensagem = {
    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>
    //    <|>-=-=-=-=-<|>  MENSAGENS DE SUCESSO (2XX)   <|>-=-=-=-=-=-<|>
    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>

    /**
     * Retorna o status 201. 
     * Utilizado quando um item é inserido no banco de dados com sucesso.
     * @param {Object} response - Objeto contendo os dados do item criado.
     * @returns {Object} JSON de resposta.
     */
    SUCESSO_CRIAR_ITEM(response) {
        let baseMessage = structuredClone(DEFAULT_MESSAGE);
        let message = structuredClone(SUCESS_CREATE_ITEM);

        baseMessage.status = message.status;
        baseMessage.status_code = message.status_code;
        baseMessage.message = message.message;
        baseMessage.response = response;
        baseMessage.image = message.image;

        return baseMessage;
    },

    /**
     * Retorna o status 200. 
     * Utilizado quando os dados de um item são atualizados com sucesso.
     * @param {Object} response - Objeto contendo os dados atualizados.
     * @returns {Object} JSON de resposta.
     */
    SUCESSO_ATUALIZAR_ITEM(response) {
        let baseMessage = structuredClone(DEFAULT_MESSAGE);
        let message = structuredClone(SUCCESS_UPDATE_ITEM);

        baseMessage.status = message.status;
        baseMessage.status_code = message.status_code;
        baseMessage.message = message.message;
        baseMessage.response = response;
        baseMessage.image = message.image;

        return baseMessage;
    },

    /**
     * Retorna o status 200. 
     * Utilizado quando um item é deletado do banco de dados com sucesso.
     * @returns {Object} JSON de resposta.
     */
    SUCESSO_DELETAR_ITEM() {
        let message = structuredClone(SUCCESS_DELETED_ITEM);

        return message;
    },

    /**
     * Retorna o status 200 junto com os dados pesquisados.
     * @param {Array|Object} result - Os dados encontrados na pesquisa.
     * @param {String} [nomeEntidade='dados'] - (Opcional) Nome para a chave de resposta.
     * @returns {Object} JSON de resposta.
     */
    RETORNAR_ITENS_ENCONTRADOS(result, nomeEntidade = 'dados') {
        let baseMessage = structuredClone(DEFAULT_MESSAGE);
        let message = structuredClone(SUCCESS_RESPONSE);

        baseMessage.status = message.status;
        baseMessage.status_code = message.status_code;
        baseMessage.image = message.image;

        if (Array.isArray(result)) {
            if(result.length !== 1) {
                baseMessage.response.count = result.length;
            }
        }

        baseMessage.response[nomeEntidade] = result;

        return baseMessage;
    },

    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>
    //    <|>-=-=-<|> ERROS DE CLIENTE / REQUISIÇÃO (4XX) <|>-=-=-=-=-<|>
    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>

    /**
     * Retorna o erro 400. 
     * Utilizado quando uma requisição não foi feita corretamente.
     * @param {String} field - Nome do campo que causou o erro.
     * @returns {Object} JSON de resposta.
     */
    REQUISICAO_INVALIDA(field) {
        field = `[${field.toUpperCase()}] INVÁLIDO`;
        let message = structuredClone(ERROR_BAD_REQUEST);
        message.field = field;
        return message;
    },

    /**
     * Retorna o erro 415. 
     * Utilizado quando o os dados não foram enviados como JSON.
     * @returns {Object} JSON de resposta.
     */
    ERRO_CONTENT_TYPE() {
        let message = structuredClone(ERROR_CONTENT_TYPE);

        return message;
    },

    /**
     * Retorna o erro 404. 
     * Utilizado quando a busca no banco de dados não retorna nada.
     * @returns {Object} JSON de resposta.
     */
    ERRO_NADA_ENCONTRADO() {
        let message = structuredClone(ERROR_NOT_FOUND);

        return message;
    },

    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>
    //    <|>-=-=-=-=-<|>    ERROS DE SERVIDOR (5XX)    <|>-=-=-=-=-=-<|>
    //    <|>-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-<|>

    /**
     * Retorna o erro 500 (MODEL). 
     * Utilizado quando ocorre uma falha dentro da MODEL.
     * @returns {Object} JSON de resposta.
     */
    ERRO_MODEL() {
        let message = structuredClone(ERROR_INTERNAL_SERVER_MODEL);
        return message;
    },

    /**
     * Retorna o erro 500 (CONTROLLER). 
     * Utilizado quando ocorre uma falha dentro da CONTROLLER.
     * @returns {Object} JSON de resposta.
     */
    ERRO_CONTROLLER() {
        let message = structuredClone(ERROR_INTERNAL_SERVER_CONTROLLER);
        return message;
    }
};

module.exports = {
    mensagem
};