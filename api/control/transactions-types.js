/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Pegar a variável de tipos de transação no modelo da database.
var TransactionType = require('../modelDatabase/transactions-types');


//Função para listar todos os tipos de transações disponíveis na database.
const listAll = async()=> {
    try {
        //Constante que retorna todos os tipos.
        const transaction_types = await TransactionType.findAll();
        return transaction_types;
    } catch {
        throw new Error('Erro ao tentar buscar typestrans');
    }
};


//Aqui exportamos as funções
module.exports = {listAll};