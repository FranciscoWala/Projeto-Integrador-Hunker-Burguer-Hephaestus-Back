/******************************************************************************
 * Objetivo arquivo responsável por CRUD de dados da tabela intermediária cate-
 * goria Hamburguer no banco de dados
 * Data 12/06/26
 * Autor: Francisco Wala
 * Varsão: 1.0.0
 ******************************************************************************/
const knex = require('knex')
const knexDatabaseconfig = require('../../database/database_config/knexConfig.js')

const knexConection = knex(knexDatabaseconfig.development)


//INSERT DA CATEGORIA_HAMBURGUER
const insertCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = `insert into tbl_categoria_hamburguer (
                        id_hamburguer,
                        id_categoria
                        ) values (
                        ${categoriaHamburguer.id_hamburguer},
                        ${categoriaHamburguer.id_categoria}
                    );`

    } catch (error) {
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);
        return false
    }

}

const updateCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = ``

    } catch (error) {
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);
        return false
    }

}
const selectAllCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = ``

    } catch (error) {
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);
        return false
    }

}

const selcetByIdCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = ``

    } catch (error) {
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);
        return false
    }

}
const deleteCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = ``

    } catch (error) {
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);
        return false
    }

}