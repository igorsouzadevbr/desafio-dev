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

//Variável que solicita controle de usuários.
var controlUser = require('../control/users');


//Função constante que realiza login do usuário de maneira simples, comparando dados na parte do controle.
const doLogin = async(req,res)=> {
    try {
        const {username='',password=''} = req.body;
        const user = await controlUser.doLogin(username,password);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({erro:[error.message]});
    }
};


//Função constante que realiza cadastro do usuário comparando dados antes de retornar;
const doSignUp = async(req,res)=> {
    try {
        const {username='',password=''} = req.body;
        await controlUser.doSignUp(username,password);
        res.status(201).json({message:'Usuário criado com sucesso!'});
    } catch (error) {
        res.status(500).json({erro:[error.message]});
    }
};


//Aqui exportamos as funções.
module.exports={doLogin,doSignUp};