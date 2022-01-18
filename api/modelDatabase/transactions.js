/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/
var Sequelize = require('sequelize');
var database = require('../preConfig/db');

//Variáveis de lojas e tipos de transação para requisição direta da database, melhor organização e funcionamento do código.
var Shops = require('./shops');
var TransactionType = require('./transactions-types');


const Transaction = database.define(
    'transaction',
    {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true, 
        },
        type_id: {
            type: Sequelize.INTEGER,
        },
        amount: {
            type: Sequelize.DECIMAL(10,2),
        },
        cpf: {
            type: Sequelize.STRING(11),
        },
        card_number: {
            type: Sequelize.STRING(12),
        },
        shop_id: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE,
        },
    },
    {
        underscored: true,
        timestamps:false,
    }
);

//Aqui defino que as transações pertencem as lojas de acordo com o tipo de transação.
Transaction.belongsTo(Shops);
Transaction.belongsTo(TransactionType, {as:'type'});

//Aqui exportamos as funções
module.exports = Transaction;