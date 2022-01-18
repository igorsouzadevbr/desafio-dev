/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/


//Pegar a variável modelo das lojas. 
var Shop = require('../modelDatabase/shops');

//Função para listar todas as lojas na database.
const listAll = async()=> {
    try {
        //Aqui, pegamos a variável, criamos uma constante que pega todas as lojas da database de forma orgânica.
        const shops = await Shop.findAll();
        return shops;
    }catch {
        throw new Error('Erro ao buscar lojas');
    }
};

const listUnique = async({name,owner})=> {
    try {
        //Aqui, pegamos a variável, criamos uma constante que pega uma única loja da database de forma orgânica.
        const [shop] = await Shop.findOrCreate({ where:{name,owner}});
        return { ...shop.dataValues};
    }catch {
        throw new Error('Erro ao buscar loja');
    }
};

//Aqui exportamos as funções
module.exports = {listAll,listUnique};