const tratar = {
    /**
     * Função para tratar os dados.
     * 
     * @param {Object} dados - O objeto contendo os dados a serem tratados.
     * @returns {Object} - O objeto com os textos tratados.
     */
    DADOS: function (dados) {
        for (let campo in dados) {

            if (typeof dados[campo] === 'string') {
                dados[campo] = dados[campo].replaceAll("'", "’");
            }
        }

        return dados;
    }
};

module.exports = {
    tratar
};