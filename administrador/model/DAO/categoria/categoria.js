/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de categoria no
 * banco de dados
 * Data: 12/06/2026
 * Autor: Gabriel José
 * Versão: 1.0.0
 *****************************************************************************/

const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');

const knexConection = knex(knexDatabaseConfig.development);
const { criarSql } = require('../../../utils/criadorSql.js');

const insertCategoria = async function (categoria) {
    try {
        let sql = criarSql.INSERT('tbl_categoria', categoria);
        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    };
};

const updateCategoria = async function (categoria) {
    try {
        let sql = criarSql.UPDATE('tbl_categoria', categoria);
        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    };
};

const selectAllCategoria = async function () {
    try {
        let sql = criarSql.SELECT('tbl_categoria');
        let result = await knexConection.raw(sql);

        if (result) {
            return result[0];
        } else {
            return false
        }
    } catch (error) {
        return false;
    };
};

const selectCategoriaById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_categoria', id);
        let result = await knexConection.raw(sql);

        if (result) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const deleteCategoria = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_categoria', id);
        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertCategoria,
    updateCategoria,
    selectAllCategoria,
    selectCategoriaById,
    deleteCategoria
};