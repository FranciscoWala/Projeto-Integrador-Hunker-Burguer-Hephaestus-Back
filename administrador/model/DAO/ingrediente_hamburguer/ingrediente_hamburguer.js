/******************************************************
 * Objetivo: arquivo destinado ao CRUD de dados da tabela intermediária ingrediente_categoria no banco de dados 
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

async function insertIngredienteHamburguer(ingredienteHamburguer) {
    try {
        let sql = 
        `
            insert int tbl_ingrediente_categoria(
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
            select * from tbl_ingrediente_categoria order by id desc;
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
            update tbl_ingrediente_hamburguer
                id_ingrediente     =    ${ingredienteHamburguer.id_ingrediente},
                id_hamburguer       =    ${ingredienteHamburguer.id_hamburguer}
        

            where id=${ingredienteHamburguer.id}
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
        sql = 
        `
            select tbl_hamburguer.*
                from tbl_hamburguer
            inner join tbl_ingrediente_hamburger
				on tbl_ingrediente_hamburger.id_hamburguer = tbl_hamburguer.id
            inner join tbl_ingrediente
                on tbl_ingrediente_hamburger.id_ingrediente = tbl_ingrediente.id
            where tbl_ingrediente.id = ${idIngrediente};
        `

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
    updateIngredienteHamburguer,
    selectByIDIngredienteHamburguer,
    updateIngredienteHamburguer,
    deleteIngredienteHamburguer,
    deleteIngredienteByIDHamburguer,
    selectIngredienteByIDHamburguer,
    selectHamburguerByIDIngrediente
}