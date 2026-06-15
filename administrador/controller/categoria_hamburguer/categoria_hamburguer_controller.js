/******************************************************************************
 * Objetivo arquivo responsável pela validação de dados da tabela intermediária cate-
 * goria Hamburguer no banco de dados
 * Data 12/06/26
 * Autor: Francisco Wala
 * Varsão: 1.0.0
 ******************************************************************************/

const validarId = function (categoriaHamburguer) {

    try {
        if( categoriaHamburguer.id_hamburguer == undefined          || 
            categoriaHamburguer.id_hamburguer == null               || 
            String(categoriaHamburguer.id_hamburguer).trim() == ''  ||
            isNaN(categoriaHamburguer.id_hamburguer)                ||
            categoriaHamburguer.id_hamburguer <= 0                  || 
            categoriaHamburguer.id_categoria == undefined           ||
            categoriaHamburguer.id_categoria == null                ||
            String(categoriaHamburguer.id_categoria).trim() == ''   ||
            isNaN(categoriaHamburguer.id_categoria)                 ||
            categoriaHamburguer.id_categoria <= 0
        ) {
            return false
        } else {
            return 'id errado'
        }
    } catch (error) {
        return configMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}