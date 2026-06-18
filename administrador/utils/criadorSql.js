/*************************************************************************************************************
 * Objetivo: Criar as funções responsáveis pela geração dos comandos SQL
 * Autor: Gabriel
 * Versão: 1.0.0
 * Data: 30/05/26
 ************************************************************************************************************/

/**
 * Objeto com as funções geradoras dos comandos SQL para o banco de dados.
 */
const criarSql = {

    /**
     * Função responsável por montar um comando de INSERT.
     * @param {string} nomeTabela - O nome da tabela.
     * @param {Object} dados - O objeto com os dados que vamos criar.
     * @param {Object} [camposEspeciais={}] - (Opcional) objeto com os campos que precisam de algum tratamento diferente.
     * @returns {string} - Retorna a string contendo o comando de SQL pronto.
     */
    INSERT(nomeTabela, dados, camposEspeciais = {}) {
        let campos = [];  //Array que vai guardar a primeira parte do insert
        let valores = []; //Array que vai guardar os valores dos campos

        //Fazendo um loop nos dados enviados
        for (let campo in dados) { //Cada dado enviado recebe o nome de campo
            let valor = dados[campo]; //Pegando o valor daquele campo isso vai algo como let "valor = dados.nome" por exemplo

            campos.push(campo); //Adicionando o campo ao array de campos

            //Antes de adicionar o valor precisamos ver se ele tem algum criterio especial
            //No caso estamos vendo se o campo atual está no json de campos especiais se estiver nos queremos saber se
            //ele tem o campo vazioNull true
            if (camposEspeciais[campo] && camposEspeciais[campo].vazioNull == true) {
                valores.push(`if('${valor}' = '', null, '${valor}')`);
            } else {
                valores.push(`'${valor}'`); //Caso não tenha campo especial nenhum só colocamos ele no array normalmente
            }
        }

        //Montando a variavel sql
        //Usamos o join para adicionar um item por vez e uma , depois, os espaços são apenas para manter o
        //codigo identado
        let sql = `
            insert into ${nomeTabela} (
                ${campos.join(',\n                ')}
            ) values (
                ${valores.join(',\n                ')}
            );
        `;

        return sql;
    },

    /**
     * Função responsável por montar um comando de UPDATE.
     * * @param {string} nomeTabela - O nome da tabela que será atualizada.
     * @param {Object} dados - O objeto contendo os campos a serem atualizados.
     * @param {Object} [camposEspeciais={}] - (Opcional) objeto com os campos que precisam de algum tratamento diferente.
     * @returns {string} - Retorna a string contendo o comando de SQL pronto.
     */
    UPDATE(nomeTabela, dados, camposEspeciais = {}) {
        let linhas = [];

        for (let campo in dados) {
            if (campo == 'id') continue;

            let valor = dados[campo];
            let valorFormatado;

            if (camposEspeciais && camposEspeciais[campo] && camposEspeciais[campo].vazioNull === true) {
                valorFormatado = `if('${valor}' = '', null, '${valor}')`;
            } else {
                valorFormatado = `'${valor}'`;
            }

            linhas.push(`${campo} = ${valorFormatado}`);
        }

        let sql = `
        update ${nomeTabela} set 
                ${linhas.join(', \n            ')}
        where id = ${dados.id};
    `;

        return sql;
    },

    /**
     * Função responsável por montar um comando de SELECT.
     * Pode criar selecs com ou sem where.
     * * @param {string} nomeTabela - O nome da tabela que será procurada.
     * @param {number|string|null} [id=null] - (Opcional) caso inserido ele gera um select com where.
     * @returns {string} - Retorna o comando de sql pronto.
     */
    SELECT(nomeTabela, id) {
        let sql = null;

        if (id == null) {
            sql = `select * from ${nomeTabela} order by id desc;`
        } else {
            sql = `select * from ${nomeTabela} where id = ${id};`
        }

        return sql;
    },

    /**
     * Função responsável por montar um comando de DELETE.
     * * @param {string} nomeTabela - O nome da tabela que o registro será apagado.
     * @param {number|string} id - Id do item a excluir.
     * @returns {string} - Retorna o comando de sql pronto.
     */
    DELETE(nomeTabela, id) {
        let sql = `delete from ${nomeTabela} where id = ${id};`;

        return sql;
    }
};

module.exports = {
    criarSql
};