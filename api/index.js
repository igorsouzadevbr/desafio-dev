/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01

PROJETO: API P/ DESAFIO DEV - BYCODERS
*/

//Seção: INDEX

//requisição do arquivo .env
require('dotenv').config();

//Funções constantes para organização do servidor
const express = require('express');
const {urlencoded, json} = require('body-parser');
const { createServer } = require('http');
//Usarei o multer para transformar o arquivo que solicitou upload.
const multer  = require('multer');
const server = express();
server.use(urlencoded({extended:true}));
//Defino a aplicação como JSON.
server.use(json({type:'application/json'}));
//defini a porta da API como 5000.
const port = 5000;


//Headers e Cors da API para requisições via JSON e autorizações
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

  //Seto a porta do servidor
server.set('port', port);


//API GET, SET, PUT, POST
//Solicito as rotas de código
const routeUser = require('./routes/users');
const routeShops = require('./routes/shops');
const routeTransactions = require('./routes/transactions');
const routeTransactionsTypes = require('./routes/transactions-types');
//transformo o multer em "upload" para organização
const upload = multer();


//Defino o router do express como api
const api = express.Router();
//realizo o login na API
const authAPI = require('./authApi');
const openAPI = express.Router();
api.use(authAPI);
server.use('/oapi', api);
server.use('/api', openAPI);
//Requisições POST
openAPI.post('/login', routeUser.doLogin);
openAPI.post('/signup', routeUser.doSignUp);
api.post('/transactions',upload.single('file'),routeTransactions.saveTransactions);

//Requisições GET
api.get('/transactions', routeTransactions.getTransactions);
api.get('/transactions/:id', routeTransactions.getTransaction);
api.get('/transactions/shop/:shop',routeTransactions.getTransactionsByShop);
api.get('/transactions-types', routeTransactionsTypes.listAll);
api.get('/shops', routeShops.listAll);


//Requisições no endereço /OAPI, mensagem inicial de sucesso.
openAPI.all('*', (req, res) => {
    res.json({ message: 'Seja bem-vindo a nossa API', version: '0' });
  });

//Crio o servidor
var app = createServer(server);

//Faço o servidor ouvir na porta definida e retorno mensagem de sucesso.
app.listen(port, () => console.log('API ON!\nRodando na porta', port));


//PROJETO API OK
//EXP TÉRMINO DA PARTE WEB: 17/01 - 17:00



