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

const User = database.define(
    'user',
    {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true, 
        },
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
      }
);

//Aqui exportamos as funções
module.exports = User;