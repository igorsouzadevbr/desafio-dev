/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Seção: Gerar Token para API usando jwt
const jwt = require('jsonwebtoken');


//Aqui exportamos as funções abaixo de token, modelo gerado pelo jsonwebtoken.
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const token = req.headers.authorization;

  if (!token)
    return res.status(401).send({ error: ['Acesso negado'], suggestion: ['Tente verificar o token.'] });

  const response = jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err)
      return res.status(401).send({ error: ['Falha no Token'], suggestion: ['none'] });

    return next();
  });

  return response;
};