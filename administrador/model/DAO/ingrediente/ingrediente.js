/******************************************************
 * Objetivo: arquivo destinado ao CRUD de dados do Ingrediente no banco de dados 
 * MYSQL
 * Data: 16/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
*/

//realizando import do knex
const knex = require('knex')

//Import do arquivo das configurações do Knex
const knexDatabaseConfig = require('../../database/database_config/knexConfig')

//Cria a conexão com o BD 
const knexConection = knex(knexDatabaseConfig.development)

async function insertIngrediente(ingrediente) {
    try {
        let sql = 
        `
            insert into tbl_ingrediente(
                nome,
                preco,
                foto
            )values(
                '${ingrediente.nome}',
                '${ingrediente.preco}',
                '${ingrediente.foto}'
            );      
        `

        let result = await knexConection.raw(sql)

        if (result) {
            return result[0].insertId
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

async function selectAllIngrediente() {
    try {
        let sql = 
        `
            select * from tbl_ingrediente order by id desc;
        `

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        }

        return false
    } catch (error) {
        return false
    }
}

async function selectByIDIngrediente(id) {
    try {
        let sql = 
        `
            select * from tbl_ingrediente where id=${id}
        `

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

async function updateIngrediente(ingrediente) {
    try {
        let sql =
        `
            update tbl_ingrediente
                set nome =          '${ingrediente.nome}',
                preco =             '${ingrediente.preco}',
                foto =              '${ingrediente.foto}'
            where id=${ingrediente.id}
        `

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

async function deleteIngrediente(id) {
    try {
        let sql = 
        `
            delete from tbl_ingrediente where id=${id}
        `

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    insertIngrediente,
    selectAllIngrediente,
    selectByIDIngrediente,
    updateIngrediente,
    deleteIngrediente
}