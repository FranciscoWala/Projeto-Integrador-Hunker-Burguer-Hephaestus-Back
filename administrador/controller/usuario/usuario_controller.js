const mensagens = require('../controller/modulo/configMensages.js')

const usuarioDAO = require('../../model/DAO/usuario/usuario.js')

const validarDados = async function (usuario){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))

    if(usuario.login == undefined || usuario.login == null || usuario.login == '' || usuario.login.length > 150){
        return customMenssagen.ERROR_BAD_REQUEST.fild = '[LOGIN] INVALIDO'
    }else if(usuario.senha == undefined || usuario.senha == null || usuario.senha == '' || usuario.senha.length > 512){
        return customMenssagen.ERROR_BAD_REQUEST.fild = '[SENHA] INVALIDA'
    }
}

const tratarDados = async function(usuario){
    usuario.login = usuario.login.replaceAll("'", "")
    usuario.senha = usuario.senha.replaceAll("'", "")
    return usuario
}

const inserirUsuario = async function(usuario, ContentType){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))

    try {
        if(String(ContentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDados(usuario)

            if(validar){
                return validar
            }else{
                let result = await usuarioDAO.insertUsuario(await tratarDados(usuario))

                if(result){
                    usuario.id = result
                    customMenssagen.DEFAULT_MESSAGE.status = customMenssagen.SUCCESS_CREATED_ITEM.status
                    customMenssagen.DEFAULT_MESSAGE.status_code = customMenssagen.SUCCESS_CREATED_ITEM.status_code
                    customMenssagen.DEFAULT_MESSAGE.message = customMenssagen.SUCCESS_CREATED_ITEM.message
                    customMenssagen.DEFAULT_MESSAGE.response = usuario
                }else{
                    return customMenssagen.ERROR_INTERNAL_SERVER_MODEL
                }

                return customMenssagen.DEFAULT_MESSAGE //erro no DAO
            }
        }else{
            return customMenssagen.ERROR_CONTENT_TYPE //
        }
    } catch (error) {
        return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const buscarUsuario = async function(id){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))
    try {
        if(id == undefined || id == null || String(id).replaceAll("'", "") == '' || isNaN(id)){
            customMenssagen.ERROR_BAD_REQUEST.field = '[ID] IVALIDO'
            return customMenssagen.ERROR_BAD_REQUEST
        }else{
            let result = await usuarioDAO.selectById(id)

            if(result){
                if(result.length > 0){
                    customMenssagen.DEFAULT_MESSAGE.status = customMenssagen.SUCCESS_RESPOSE.status
                    customMenssagen.DEFAULT_MESSAGE.status_code = customMenssagen.SUCCESS_RESPOSE.status_code
                    customMenssagen.DEFAULT_MESSAGE.message = customMenssagen.SUCCESS_RESPOSE.mensagens
                    customMenssagen.DEFAULT_MESSAGE.response.classificacao = result

                    return customMenssagen.DEFAULT_MESSAGE
                }else{
                    return customMenssagen.ERRO_NOT_FONDI
                }
            }else{
                return customMenssagen.ERROR_INTERNAL_SERVER_MODEL
            }
        }  

    } catch (error) {
        return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarUsuario = async function(){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))

    try {
        let result = await usuarioDAO.selectUsuario()

        if (result) {
            if (result.length > 0) {
                customMenssagen.DEFAULT_MESSAGE.status = customMenssagen.SUCCESS_RESPOSE.status
                customMenssagen.DEFAULT_MESSAGE.status_code = customMenssagen.SUCCESS_RESPOSE.status_code
                customMenssagen.DEFAULT_MESSAGE.response.filme = result
                customMenssagen.DEFAULT_MESSAGE.response.count = result.length
                return customMenssagen.DEFAULT_MESSAGE
            } else {
                return customMenssagen.ERRO_NOT_FONDI
            }
        } else {
            return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER
        }

    } catch (error) {
        return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuario = async function(usuario, id, ContentType){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))
    
    try {
        if(String(ContentType).toUpperCase() == "APPLICATION/JSON"){

            let resultBuscaID = await buscarUsuario(id)


            if(resultBuscaID.status){
                let validar = await validarDados(usuario)

                if(!validar){
                    usuario.id = Number(id)

                    let result = await usuarioDAO.update(usuario)
                    if(result){
                        customMenssagen.DEFAULT_MESSAGE.status = customMenssagen.SUCCESS_UPDATE_ITEM.status
                        customMenssagen.DEFAULT_MESSAGE.status_code = customMenssagen.SUCCESS_UPDATE_ITEM.status_code
                        customMenssagen.DEFAULT_MESSAGE.mensage = customMenssagen.SUCCESS_UPDATE_ITEM.mensage
                        customMenssagen.DEFAULT_MESSAGE.response = usuario

                        return customMenssagen.DEFAULT_MESSAGE
                    }else{
                        return customMenssagen.ERRO_NOT_FONDI
                    }
                }else{
                    return validar
                }  

            }else{
                return resultBuscaID
            }
  
        }else{
            return customMenssagen.ERROR_CONTENT_TYPE
        }


    } catch (error) {
        return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarUsuario = async function(id){
    let customMenssagen = JSON.parse(JSON.stringify(mensagens))
    try {
       let buscar = await buscarUsuario(id)

        if(buscar.status){
            let result = await usuarioDAO.deletUsuario(id)

            if(result){
                
                customMenssagen.DEFAULT_MESSAGE.status = customMenssagen.SUCCESS_DELETE_ITEM.status
                customMenssagen.DEFAULT_MESSAGE.status_code = customMenssagen.SUCCESS_DELETE_ITEM.status_code
                customMenssagen.DEFAULT_MESSAGE.message = customMenssagen.SUCCESS_DELETE_ITEM.message

                return customMenssagen.DEFAULT_MESSAGE

            }else{
                return customMenssagen.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{            
            return buscar
        }

    } catch (error) {        
        return customMenssagen.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}


module.exports = {
    inserirUsuario,
    buscarUsuario,
    listarUsuario,
    atualizarUsuario,
    deletarUsuario
}