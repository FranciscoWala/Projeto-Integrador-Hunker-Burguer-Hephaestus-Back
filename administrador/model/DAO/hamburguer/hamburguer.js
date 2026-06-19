/******************************************************
 * Objetivo: arquivo destinado ao CRUD de dados do Hamburguer no banco de dados 
 * MYSQL
 * Data: 12/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.0
*/

//realizando import do knex
const knex = require('knex')

//Import do arquivo das configurações do Knex
const knexDatabaseConfig = require('../../database/database_config/knexConfig')

//Cria a conexão com o BD 
const knexConection = knex(knexDatabaseConfig.development)

async function insertHamburguer(hamburguer) {
    try {
        let sql = 
        `
            insert into tbl_hamburguer(       
                nome,
                preco,
                foto,
                descricao
            )values(
                '${hamburguer.nome}',
                '${hamburguer.preco}',
                '${hamburguer.foto}',
                '${hamburguer.descricao}'
            );      
        `

        let result = await knexConection.raw(sql)

        console.log("dao: " + result);
        

        if (result) {
            return result[0].insertId
        }else{
            return false
        }
        
    } catch (error) {
        console.log(error)
        return false
    }
}

async function selectAllHamburguer() {
    try {
        let sql = 
        `
            select * from tbl_hamburguer order by id desc;
        `

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

async function selectByIDHamburguer(id) {
    try {
        let sql = 
        `
            select * from tbl_hamburguer where id=${id}
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

async function updateHamburguer(hamburguer) {
    try {
        let sql =
        `
            update tbl_hamburguer
                set nome =          '${hamburguer.nome}',
                preco =             '${hamburguer.preco}',
                foto =              '${hamburguer.foto}',
                descricao =         '${hamburguer.descricao}'

            where id=${hamburguer.id}
        `

        let result = await knexConection.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

async function deleteHamburguer(id) {
    try {
        let sql = 
        `
            delete from tbl_hamburguer where id=${id}
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
    insertHamburguer,
    selectAllHamburguer,
    selectByIDHamburguer,
    updateHamburguer,
    deleteHamburguer
}