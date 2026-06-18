/*************************************************************************************************************
 * Objetivo: Criar as funções responsáveis pela validação dos dados da aplicação
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/
const { mensagem } = require('../controller/modulo/configMessages.js');


/**
 * Objeto com as funções de validação da API
 */
const validar = {
    /**
     * Função responsável pelas validações de dados recebidos.
     * 
     * O parâmetro 'regras' deve ser um objeto onde cada chave é o 
     * nome do campo a ser validado, e o valor é um objeto com as regras.
     * 
     * Atributos que podem ser utilizados dentro de cada regra:
     * 
     * @property {boolean} necessario - Se for 'true' o campo se torna obrigatório. Não será aceito valor nulo, indefinido ou vazio.
     * @property {number} minimo - Define o limite mínimo de caracteres que a string deve possuir.
     * @property {number} maximo - Define o limite máximo de caracteres que a string pode possuir.
     * @property {string} tipo - Define o tipo do valor Exemplo: se for numero a função vai garantir que o número é valido.
     * 
     * 
     * @param {Object} dados - O objeto contendo os dados a serem validados.
     * @param {Object} regras - As regras de validação aplicadas a cada campo.
     * @param {string} contentType - O cabeçalho Content-Type da requisição.
     * @returns {Object|boolean} - Pode retornar 415 para erros no content type ou 400 caso um campo esteja errado e false se tudo estiver certo.
     */
    DADOS: function (dados, regras, contentType) {

        if (contentType && String(contentType).toUpperCase() !== 'APPLICATION/JSON') {
            return mensagem.ERRO_CONTENT_TYPE();
        }

        for (let campo in regras) {
            let valor = dados[campo];
            let regra = regras[campo];

            if (regra.necessario == true) {
                if (valor == undefined || valor == null || String(valor).trim() === '') {
                    return mensagem.REQUISICAO_INVALIDA(`${campo} (Não pode ser vazio)`);
                }
            }

            if (valor == undefined || valor == null) {
                continue;
            }

            if (regra.minimo && String(valor).length < regra.minimo) {
                return mensagem.REQUISICAO_INVALIDA(`${campo} (Excedeu o limite minimo de caracteres)`);
            };

            if (regra.maximo && String(valor).length > regra.maximo) {
                return mensagem.REQUISICAO_INVALIDA(`${campo} (Excedeu o limite máximo de caracteres)`);
            }

            if (regra.tipo == 'numero') {
                if (isNaN(valor)) {
                    return mensagem.REQUISICAO_INVALIDA(`${campo} (Deve ser um número)`);
                }
            }
        }

        return false;
    },

    /**
     * Função responsável por validar ids.
     * Garante que o ID foi fornecido, não é vazio, é um número e é maior que zero.
     * 
     * @param {number|string} id - O id que será validado.
     * @returns {Object|boolean} - Retorna 400 caso seja inválido e false caso seja válido.
     */
    ID: function (id) {
        if (id == undefined || String(id).trim() == '' || id == null || isNaN(id) || id <= 0) {
            return mensagem.REQUISICAO_INVALIDA("id");
        } else {
            return false;
        };
    }
};

module.exports = {
    validar
};