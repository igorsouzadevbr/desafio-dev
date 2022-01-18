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

//Variável que pega o controle direto dos tipos de transação
var controlTransactionsT = require('../control/transactions-types');

//Função constante que lista todos os tipos de transação conforme requisição, com padrão, sem variáveis.
const listAll = async(req,res)=> {
    try {
        const transaction_types = await controlTransactionsT.listAll();
        res.status(200).json(transaction_types);
    } catch (error) {
        res.status(500).json({error:[error.message]});      
  }
};


//Aqui exportamos a função.
module.exports={listAll};