/******************************************************
 * Objetivo: arquivo destinado ao CRUD de dados da tabela intermediária ingrediente_hamburguer no banco de dados 
 * MYSQL
 * Data: 12/06/2026
 * Autor: Samuel Silva Moreira Dos Santos
 * Versão: 1.1
*/

//realizando import do knex
const knex = require('knex')

//Import do arquivo das configurações do Knex
const knexDatabaseConfig = require('../../database/database_config/knexConfig')

//Cria a conexão com o BD 
const knexConection = knex(knexDatabaseConfig.development)

async function insertIngredienteHamburguer(ingredienteHamburguer) {
    try {
        let sql = 
        `
            insert into tbl_ingrediente_hamburguer(
                id_ingrediente,
                id_hamburguer
            )values(
                ${ingredienteHamburguer.id_ingrediente},
                ${ingredienteHamburguer.id_hamburguer}
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

async function selectAllIngredienteHamburguer() {
    try {
        let sql = 
        `
            select * from tbl_ingrediente_hamburguer order by id desc;
        `
        //CORREÇÃO: a query referenciava 'tbl_ingrediente_categoria' em vez de 'tbl_ingrediente_hamburguer'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        }

        return false
    } catch (error) {
        return false
    }
}

async function selectByIDIngredienteHamburguer(id) {
    try {
        let sql = 
        `
            select * from tbl_ingrediente_hamburguer where id=${id}
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

async function updateIngredienteHamburguer(ingredienteHamburguer) {
    try {
        let sql =
        `
            update tbl_ingrediente_hamburguer set
                id_ingrediente     =    ${ingredienteHamburguer.id_ingrediente},
                id_hamburguer      =    ${ingredienteHamburguer.id_hamburguer}

            where id=${ingredienteHamburguer.id}
        `
        //CORREÇÃO: faltava a cláusula 'set' após o nome da tabela no update

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

async function deleteIngredienteHamburguer(id) {
    try {
        let sql = 
        `
            delete from tbl_ingrediente_hamburguer where id=${id}
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

async function deleteIngredienteByIDHamburguer(idHamburguer) {
    try {
        let sql = `delete from tbl_ingrediente_hamburguer where id_hamburguer = ${idHamburguer}`
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

async function selectIngredienteByIDHamburguer(idHamburguer) {
    try {
        let sql = 
        `
            select tbl_ingrediente.*
                from tbl_hamburguer
            inner join tbl_ingrediente_hamburguer
                on tbl_ingrediente_hamburguer.id_hamburguer  = tbl_hamburguer.id
            right join tbl_ingrediente
                on tbl_ingrediente_hamburguer.id_ingrediente = tbl_ingrediente.id
            where tbl_hamburguer.id = ${idHamburguer}
        `

        let result = await knexConection.raw(sql)

        if (result) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

async function selectHamburguerByIDIngrediente(idIngrediente) {
    try {
        let sql = 
        `
            select tbl_hamburguer.*
                from tbl_hamburguer
            inner join tbl_ingrediente_hamburguer
				on tbl_ingrediente_hamburguer.id_hamburguer = tbl_hamburguer.id
            inner join tbl_ingrediente
                on tbl_ingrediente_hamburguer.id_ingrediente = tbl_ingrediente.id
            where tbl_ingrediente.id = ${idIngrediente};
        `
        //CORREÇÃO 1: nome da tabela estava 'tbl_ingrediente_hamburger' (sem 'u') em ambos os JOINs
        //CORREÇÃO 2: variável 'sql' declarada sem 'let', causando vazamento para escopo global

        let result = await knexConection.raw(sql)

        if (result)
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
  insertIngredienteHamburguer,
  selectAllIngredienteHamburguer,
  selectByIDIngredienteHamburguer,
  deleteIngredienteHamburguer,
  deleteIngredienteByIDHamburguer,
  selectIngredienteByIDHamburguer,
  selectHamburguerByIDIngrediente
}

