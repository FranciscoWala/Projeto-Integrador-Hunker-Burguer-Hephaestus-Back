const mensagens = require('../controller/modulo/configMensages.js')

const usuarioDAO = require('../model/DAO/usuario/usuario.js')

const validardados = async function (login, senha){
    let custonMenssagen = JSON.parse(JSON.stringify(mensagens))

    if(login.login == undefined || login.login == null || login.login == '' || login.login.length > 150){
        return custonMenssagen.ERROR_BAD_REQUEST.fild = '[LOGIN]'
    }else if(senha.senha == undefined || senha.senha == null || senha.senha == '' || senha.senha.length > 512){

    }
}