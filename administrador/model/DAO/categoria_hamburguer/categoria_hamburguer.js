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

    let result = await knexConection.raw(sql)

    if(result) {
        return true
    } else {
        return false
    }

    } catch (error) {

        console.log(`Problemas em inserir categoria hamburguer [MODEL] ${error}`);

        return false
    }

}

const updateCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = `
            update tbl_categoria_hamburguer 
	        set 
                id_hamburguer = ${categoriaHamburguer.id_hamburguer},
                id_categoria = ${categoriaHamburguer.id_categoria}
                where id = ${categoriaHamburguer.id};`

        let result = await knexConection.raw(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);

        return false
    }

}

const selectAllCategoriaHamburguer = async function () {

    try {

        let sql = `select * from tbl_categoria_hamburguer order by id desc;`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        } else {
            return false
        }

    } catch (error) {

        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);

        return false
    }

}

const seletByIdCategoriaHamburguer = async function (id) {

    try {

        let sql = `select * from tbl_categoria_hamburguer where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {

        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);

        return false
    }

}

//Função para retornar os dados do Genero filtrando pelo ID do Filme
const selectCategoriaHamburguerById = async function(idCategoria){
    try {
        let sql = `		select tbl_categoria_hamburguer.*
            from tbl_hamburguer
                inner join tbl_categoria_hamburguer
                    on tbl_hamburguer.id = tbl_categoria_hamburguer.id_hamburguer
                inner join tbl_categoria
                    on tbl_categoria.id = tbl_categoria_hamburguer.id_categoria
            
            where tbl_categoria_hamburguer.id = ${idCategoria.id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteCategoriaHamburguer = async function (categoriaHamburguer) {

    try {

        let sql = `delete from tbl_categoria_hamburguer where id = ${categoriaHamburguer.id};`

        let result = await knexConection.raw(sql)

        if(result) {
            return true
        } else {
            return false
        }

    } catch (error) {  
         
        console.log(`Deu problema aqui na categoria hamburguer [MODEL] ${error}`);

        return false
    }

}

module.exports = {
    insertCategoriaHamburguer,
    updateCategoriaHamburguer,
    selectAllCategoriaHamburguer,
    seletByIdCategoriaHamburguer,
    deleteCategoriaHamburguer
}