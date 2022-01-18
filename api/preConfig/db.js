/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Realizar conexão ao db utilizando Sequelize.
const Sequelize = require('sequelize');

const connectionString = `postgres://${process.env.db_username}:${process.env.db_password}@${process.env.db_host}:${process.env.db_port}/${process.env.db_name}`;

const sequelize = new Sequelize(connectionString, {dialect: 'postgres'});


//Aqui exportamos a função
module.exports = sequelize;
