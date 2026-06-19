/* *********************************************************************
* Objective    : Arquivo responsável pelo CRUD de dados da 'tbl_ingrediente'
* Date         : 2026-06-12  
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// ---| Import de biblioteca |---

const knex     = require('knex')                                

// ---| Import dos arquivos |---

const dbConfig = require('../../database_config/knexConfig.js') 
const db       = knex(dbConfig.development)                     

// ---| Funções dos Queries SQL |---

// Função responsável por INSERIR um novo ingrediente no Banco de Dados - POST
const insertIngrediente = async function (objectIngrediente){

    try {
        
        let scrpitSQL = `
        insert into tbl_ingrediente(
            nome,
            foto,
            preco 
        )values(
            '${objectIngrediente.nome}',
            '${objectIngrediente.foto}',
            '${objectIngrediente.preco}'
        );
        `

        let result = await db.raw(scrpitSQL)

        if(result){
            return result[0].insertId // Retorna o ID gerado pelo Insert 
        
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

// Função responsável para ATUALIZAR um Ingrediente existente no Banco de Dados - PUT
const updateIngrediente = async function(objectIngrediente){

    try {
        
        let scrpitSQL = 
        `
        update tbl_ingrediente set
            nome  = '${objectIngrediente.nome}',
            foto  = '${objectIngrediente.foto}',
            preco = '${objectIngrediente.preco}'
        where id = ${objectIngrediente.id}
        `

        let result = await db.raw(scrpitSQL)

        if(result){
            return true
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// Função responsável por RETORNAR TODOS os dados de Ingrediente do Banco de Dados - GET
const selectAllIngrediente = async function(){

    try {

        let scrpitSQL = `select * from tbl_ingrediente order by id desc`

        let result = await db.raw(scrpitSQL)

        if(Array.isArray(result)){
            return result[0]  // Retornar somente o índice com a lista de Ingredientes
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// Função responsável por RETORNAR UM Ingrediente | filtro = ID - GET
const selectByIdIngrediente = async function(id){

    try {
        
        let scrpitSQL = `select * from tbl_ingrediente where id= ${id}`

        let result = await db.raw(scrpitSQL)

        if(Array.isArray(result)){
            return result[0]
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// Função responsável por DELETAR um Ingrediente | filtro = ID - DELETE
const deleteIngrediente = async function(id){

    try {
        
        let scrpitSQL = `delete from tbl_ingrediente where id= ${id}`

        let result = await db.raw(scrpitSQL)

        if(result){
            return true
        
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

// ---| Exportação das Funções |---

module.exports={
    insertIngrediente,
    updateIngrediente,
    selectAllIngrediente,
    selectByIdIngrediente,
    deleteIngrediente
}