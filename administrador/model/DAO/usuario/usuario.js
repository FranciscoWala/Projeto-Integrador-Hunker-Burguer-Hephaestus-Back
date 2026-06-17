//inporta da blibioteca para manipular dados do banco de dados do mysql
const knex = require('knex')

// import do arquivo de configuração  para acesso ao banco de dados
const knexDatabaseConfig = require('../../database/database_config/knexConfig.js')

// Criar a conecção do banco de dados do MySQL 
const knexConection = knex(knexDatabaseConfig.development)

const insertUsuario = async function(usuario){
    
    try {
        
        let sql = `insert into tbl_usuario(
                        login,
                        senha
                        )values(
                        '${usuario.login}',
                        '${usuario.senha}'
                        );`
        
        let result = await knexConection.raw(sql)

        if(result){
            return result[0].insertId
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const selectById = async function (id){
    try {
        let sql = `select * from tbl_usuario where id = ${id};`

        let result = await knexConection.raw(sql)
        if(result){
            return result[0].insertId
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


const selectUsuario = async function(){
    try {
        let sql = 'select * from tbl_usuario order by id desc;'
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

const update = async function (usuario){
    try {
        let sql = `update tbl_usuario set
                    genero = '${usuario.login}',
                    where id = '${usuario.senha}'`

        let result = await knexConection.raw(sql)
        
        if(result){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const deletUsuario = async function(id){
    try {
        let sql = `delete from tbl_usuario where id=${id}`
        let result = await knexConection.raw(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {        
        return false
    }
}

module.exports = {
    insertUsuario,
    selectById,
    selectUsuario,
    update,
    deletUsuario
}

