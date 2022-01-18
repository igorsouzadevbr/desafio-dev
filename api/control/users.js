/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Variáveis e constantes que requisitam os modelos de banco de dados para organização e padrão de código.
var Users = require('../modelDatabase/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modelDatabase/users');


//Função para realizar login do usuário (requisição por FRONTEND)
const doLogin = async(username,password)=> {
    try {
        //Variável do usuário localizado por username, de acordo com requisição via formulário ou shell.
        var user = await Users.findOne({where:{username}});

        //Verificações básicas de comparação de dados do usuário de acordo com recebido.
        if (!user) throw new Error('Usuário não encontrado');
        if (!bcrypt.compareSync(password, user.password)) throw new Error('Senha inválida');
        //continua

        //Realiza o login do usuário e torna um token para ser utilizado posteriormente.
        var userTokenGen = {
            id: user.id,
            username: user.username,
        };
        var token = jwt.sign(userTokenGen, process.env.SECRET_KEY, { expiresIn: '1 day' });
        return { ...userTokenGen, token};
    } catch(e){
        throw new Error(e.message);
    }
};


//Função para realizar cadastro do usuário de acordo com recebido via frontend.
const doSignUp = async(username,password)=> {
    try {
        //variáveis para verificação de existenciamento do usuário na database
        var user = await Users.findOne({where:{username}});
        if (user && user.id) throw new Error('Usuário já cadastrado');
        //continua

        //cria usuário
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync());
        user = await User.create({username,password:passwordHash});
        
        //retorna como sucesso
        return true;
    } catch(e){
        throw new Error(e.message);
    }
};

//Aqui exportamos as funções
module.exports={doLogin,doSignUp};