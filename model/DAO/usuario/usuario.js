//inporta da blibioteca para manipular dados do banco de dados do mysql
const knex = require('knex')

// import do arquivo de configuração  para acesso ao banco de dados
const knexDatabaseConfig = require('../../database/database_config/knexConfig.js')

// Criar a conecção do banco de dados do MySQL 
const knexConection = knex(knexDatabaseConfig.development)

const insertUsuario = async function(login, senha){
    
    try {
        
        let sql = `insert into tbl_usuario(
                        login,
                        senha
                        )values(
                        '${login.login}',
                        '${senha.senha}'
                        );`
        
        let result = await knexConection.raw(sql)

        if(result){
            return result[0].insertId
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

