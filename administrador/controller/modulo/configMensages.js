const DEFAULT_MESSAGE = {
    api_description: 'API para controlar o projeto de Filmes',
    development: 'Nathan proença de luna',
    version: '1.0.4.26',
    status: Boolean,
    status_code: Number,
    response: {}
}

//Mensagens de ERRO do projeto de filmes
const ERROR_BAD_REQUEST = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição devido a erros de entrada de dados.'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [MODEL]'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Não foi possível processar a requisição, pois o formato de dados encaminhado não é suportado pelo servidor, apenas deve ser utilizado JSON.'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a um erro interno no servidor [CONTROLLER]'
}

//Mensagens de SUCESSO do projeto de filmes
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Item inserido com sucesso!'
}
const ERRO_NOT_FONDI = {
    status: false,
    status_code: 404,
    message: 'dados não encontrados'
}

const SUCCESS_RESPOSE ={
    status: true,
    status_code: 200,
}

const SUCCESS_UPDATE_ITEM = {
    status: true,
    status_code: 200,
    message: 'item atualizado com sucesso'
}

const SUCCESS_DELETE_ITEM = {
    status: true,
    status_code: 200,
    message: 'item deletado com sucesso'
}

const SUCCESS_CREATED_ITEM_WARING = {
    status: true,
    status_code: 200,
    message: 'Item inserido com sucesso! porem algun dados tiveram problemas no cadrasto [DADOS  DE RELACIONAMENTO]'
}


module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERRO_NOT_FONDI,
    SUCCESS_RESPOSE,
    SUCCESS_UPDATE_ITEM,
    SUCCESS_DELETE_ITEM,
    SUCCESS_CREATED_ITEM_WARING
}