/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Seção: ROTAS P/API em ./index.js

//Variável que pega o controle direto de funções das lojas
var controlShops = require('../control/shops');


//Função constante que lista todas as lojas conforme requisição, com padrão, sem variáveis.
const listAll = async(req,res)=>{
    try {
        const shops = await controlShops.listAll();
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json({error:[error.message]});      
    }
};


//Aqui exportamos a função.
module.exports={listAll};