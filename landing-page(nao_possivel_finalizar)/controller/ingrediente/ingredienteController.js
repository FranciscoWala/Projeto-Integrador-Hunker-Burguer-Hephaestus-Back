/* *********************************************************************
* Objective    : Arquivo responsável pela (validação, tratamento, manipulação de dados) para realizar o CRUD 'tbl_ingrediente'
* Date         : 2026-06-12
* Development  : Lucas Alexandre Da Silva
* Version      : 1.0
* **********************************************************************/

// ---| Import dos arquivos |---

const statusCodeMessage = require('../modulo/httpStatusMessage.js')
const ingredienteDAO    = require('../../model/DAO/ingrediente/ingrediente.js')

// -------------- | Funções do CRUD | -------------- 

// Função responsável por inserir um novo Ingrediente
const inserirIngrediente = async function(objectIngrediente, contentType){

    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    // Verifica se dentro do arquivo controller possui algum bug de digitação | error = 500 
    try {

        // Faz a condição do tipo de dado ser (JSON)
        if(String(contentType).trim().toLocaleLowerCase() == 'application/json'){
            
            let tipoDadoValido = await validarDados(objectIngrediente)

            // Validação do tipo de dado (JSON) | false = 415
            if(tipoDadoValido){
                return tipoDadoValido // 400 
            
            }else{
                
                // Chama a função de insert no DAO | Chama a função de tratar dados passando o object como parâmetro
                let result = await ingredienteDAO.insertIngrediente(await tratarDados(objectIngrediente))

                // Validação para verificar se o DAO conseguiu processar o scrpit no DB | false = 500 (Model)
                if(result){

                    // Cria o atributo ID no JSON
                    objectIngrediente.id = Number(result)

                    messageClone.DEFAULT_MESSAGE.status      = messageClone.SUCESS_201_CREAT_ITEM.status
                    messageClone.DEFAULT_MESSAGE.status_code = messageClone.SUCESS_201_CREAT_ITEM.status_code
                    messageClone.DEFAULT_MESSAGE.message     = messageClone.SUCESS_201_CREAT_ITEM.message
                    messageClone.DEFAULT_MESSAGE.response    = objectIngrediente

                    return messageClone.DEFAULT_MESSAGE // 200

                }else{
                    return messageClone.ERROR_500_INTERNAL_SERVER_MODEL // 500 (Model - DAO)
                }
            }
    
        }else{
            return messageClone.ERROR_415_CONTENT_TYPE // 415 (Tipo de dado inválido)
        }

    } catch (error) {
        return messageClone.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    
    }
}

// Função responsável por listar todos os Ingredientes
const listarIngrediente = async function(){

    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    try {
        
        let result = await ingredienteDAO.selectAllIngrediente()

        if(result.length > 0){

            messageClone.DEFAULT_MESSAGE.status                = messageClone.SUCESS_200_RESPONSE.status 
            messageClone.DEFAULT_MESSAGE.status_code           = messageClone.SUCESS_200_RESPONSE.status_code
            messageClone.DEFAULT_MESSAGE.response.count        = result.length
            messageClone.DEFAULT_MESSAGE.response.ingrediente  = result
            
            return messageClone.DEFAULT_MESSAGE // 200
        
        }else{
            return messageClone.ERROR_500_INTERNAL_SERVER_MODEL // 500 (Model - DAO)
        }

    } catch (error) {
        return messageClone.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
}

// Função responsável por buscar um Ingrediente
const buscarIngrediente = async function(id){

    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    try {
        
        // Validação do ID
        if(id == undefined || id == null || id == '' || isNaN(id) || String(id).replaceAll(' ','') == '' || id <= 0){
            messageClone.ERROR_400_BAD_REQUEST.field = "[ID INVÁLIDO]"
            return messageClone.ERROR_400_BAD_REQUEST
        
        }else{
            
            let result = await ingredienteDAO.selectByIdIngrediente(id)

            // Validação para verificar se o DAO retornou dados | false = 500
            if(result){

                // Validação para veficiar se o DAO possui algum dado dentro do ARRAY | false = 404 
                if(result.length > 0){

                    messageClone.DEFAULT_MESSAGE.status                = messageClone.SUCESS_200_RESPONSE.status
                    messageClone.DEFAULT_MESSAGE.status_code           = messageClone.SUCESS_200_RESPONSE.status_code
                    messageClone.DEFAULT_MESSAGE.response.ingrediente  = result
                
                    return messageClone.DEFAULT_MESSAGE // 200

                }else{
                    return messageClone. ERROR_404_NOT_FOUND // 404 (item não encontrado)
                }
                
            }else{
                return messageClone.ERROR_500_INTERNAL_SERVER_MODEL // 500 (Model - DAO)
            }
        }

    } catch (error) {
        return messageClone.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
}

// Função responsável por atualizar um Ingrediente
const atualizarIngrediente = async function(id, contentType, objectIngrediente){

    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    try {
        
        if(String(contentType).trim().toLocaleLowerCase() == 'application/json'){
        
            let idValido = await buscarIngrediente(id)

            if(idValido.status){

                let statusIngredienteValido = await validarDados(await tratarDados(objectIngrediente))

                if(!statusIngredienteValido){

                    objectIngrediente.id = Number(id)

                    let result = ingredienteDAO.updateIngrediente(await tratarDados(objectIngrediente))

                    if(result){

                        messageClone.DEFAULT_MESSAGE.status         = messageClone.SUCESS_200_UPDATED_ITEM.status
                        messageClone.DEFAULT_MESSAGE.status_code    = messageClone.SUCESS_200_UPDATED_ITEM.status_code
                        messageClone.DEFAULT_MESSAGE.message        = messageClone.SUCESS_200_UPDATED_ITEM.message
                        messageClone.DEFAULT_MESSAGE.respose        = objectIngrediente

                        return messageClone.DEFAULT_MESSAGE // 200
                    
                    }else{
                        return messageClone.ERROR_500_INTERNAL_SERVER_MODEL // 500 (Model - DAO)
                    }

                }else{
                    return statusIngredienteValido // 400 (item não encontrado)
                }
                                
            }else{
                return idValido // 400 (item não encontrado) ou 404 (item inválido)
            }
        
        }else{
            return messageClone.ERROR_415_CONTENT_TYPE // 415 (tipo de dado inválido) 
        }

    } catch (error) {
        return messageClone.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
} 


// Função responsável por deletar um Ingrediente
const excluirIngrediente = async function(id){

    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    try {
        
        let idValido = await buscarIngrediente(id)

        if(idValido.status){

            let result = await ingredienteDAO.deleteIngrediente(id)

            if(result){
                return messageClone.SUCESS_200_DELETE_ITEM // 200
                
            }else{
                return messageClone.ERROR_500_INTERNAL_SERVER_MODEL // 500 (Model - DAO)
            }

        }else{
            return idValido // 400 (item não encontrado) ou 404 (item inválido)
        }

    } catch (error) {
        return messageClone.ERROR_500_INTERNAL_SERVER_CONTROLLER // 500 (Controller)
    }
}


// ---| Validar Dados |---

const validarDados = async function(objectIngrediente){
    
    let messageClone = JSON.parse(JSON.stringify(statusCodeMessage))

    if(objectIngrediente.nome == undefined || objectIngrediente.nome == '' || objectIngrediente.nome == null || objectIngrediente.nome.length > 45){
        messageClone.ERROR_400_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return messageClone.ERROR_400_BAD_REQUEST
    
    }else if(objectIngrediente.foto == undefined || objectIngrediente.foto == '' || objectIngrediente.foto == null || objectIngrediente.foto.length > 250){
        messageClone.ERROR_400_BAD_REQUEST.field = '[FOTO] INVÁLIDO'
        return messageClone.ERROR_400_BAD_REQUEST
    
    }else if(objectIngrediente.preco == undefined || objectIngrediente.preco == '' || objectIngrediente.preco == null || isNaN(objectIngrediente.preco) || objectIngrediente.preco.length > 5){
        messageClone.ERROR_400_BAD_REQUEST.field = '[PRECO] INVÁLIDO'
        return messageClone.ERROR_400_BAD_REQUEST
    
    }else{
        return false
    }
}


// ---| Tratar Dados |---

const tratarDados = async function(objectIngrediente){

    // Tratamento para eliminar a chegada das (') como caracter inválido
    objectIngrediente.nome  = objectIngrediente.nome.replaceAll("'","")
    objectIngrediente.foto  = objectIngrediente.foto.replaceAll("'","")
    objectIngrediente.preco = objectIngrediente.preco.replaceAll("'","")
    
    return objectIngrediente
}


// ---| Export das Funções |---

module.exports = {
    inserirIngrediente,
    listarIngrediente,
    buscarIngrediente,
    atualizarIngrediente,
    excluirIngrediente
}