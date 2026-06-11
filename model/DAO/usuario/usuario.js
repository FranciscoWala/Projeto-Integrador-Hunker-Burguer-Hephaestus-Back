//inporta da blibioteca para manipular dados do banco de dados do mysql
const knex = require('knex')

// import do arquivo de configuração  para acesso ao banco de dados
const knexDatabaseConfig = require('../../database/database_config/knexConfig.js')

// Criar a conecção do banco de dados do MySQL 
const knexConection = knex(knexDatabaseConfig.development)

const insertUsuario = async function(login, senha){
    
    try {
        
        let sql = ``

    } catch (error) {
        
    }
}