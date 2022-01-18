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

//Variáveis que solicitam os controles de transações e lojas
var controlTransactions = require('../control/transactions');
var controlShops = require('../control/shops');


//Função constante que transforma o arquivo CNAB lido em linhas unicamente divididas para organização direta no banco de dados.
const parseTransaction = (line) => {
    const transaction = {
      //organizar tipo de transação
      type_id: Number(line[0]),
      //organizar data de transação/ocorrência
      date: new Date(line.substr(1, 4), line.substr(5, 2), line.substr(7, 2), line.substr(42, 2), line.substr(44, 2), line.substr(46, 2)),
      //organizar valores de transações
      amount: Number(line.substr(9, 10)) / 100,
      //organizar cpf's
      cpf: line.substr(19, 11),
      //organizar números de cartões
      card_number: line.substr(30, 12),
      //organizar nomes de lojas & nomes de donos
      shop: {name: line.substr(62, 19).trim(), owner: line.substr(48, 14).trim(),},
    };
    return transaction;
  };

  //Função constante que solicita as transações de acordo com requisição via query direta.
  const getTransactions = async(req,res)=> {
      try {
          const { query={} }= req;
          const transaction = await controlTransactions.getTransactions(query);
          res.status(200).send(transaction);
      } catch (error) {
        res.status(500).json({error:[error.message]});   
      }
  };

  //Função constante que pega transação única de acordo com id requisitado via body.
  const getTransaction = async(req,res)=> {
    try {
        const { id }= req.params;
        const transaction = await controlTransactions.getUnique(id);
        res.status(200).send(transaction);
    } catch (error) {
      res.status(500).json({error:[error.message]});   
    }
};

//Função constante que solicita transações por id de loja.
  const getTransactionsByShop = async(req,res)=> {
      try {
          const {shop:shop_id} = req.params;
          const transactions = await controlTransactions.getTransactions({shop_id});
          res.status(200).send(transactions);
      } catch (error) {
        res.status(500).json({error:[error.message]}); 
      }
  };

//Função para salvar alterações e organizar linhas em transações de acordo com envio de novo arquivo.
  const saveTransactions = async(req,res)=> {
      try {
        //transformo o corpo da requisição em arquivo
          const {file}=req;
          //solicito linha por linha do arquivo
          const lines = file.buffer.toString().split('\n');

          //organizo linhas unicamente
          for(let line of lines) {
            //solicito a função de organização de transações diretamente
              const transaction = parseTransaction(line);
              //listo as lojas por id de acordo com envio anterior
              const {id:shop_id}=await controlShops.listUnique(transaction.shop);
              //salvo as alterações no controle
              await controlTransactions.saveTransactions(transaction,shop_id);
          }

          return res.status(200).json({ message: 'Transações salvas com sucesso' });
    } catch (error) {
        res.status(500).json({error:[error.message]}); 
      }
  };

  //Aqui exportamos as funções.
  module.exports={getTransaction,getTransactions,getTransactionsByShop,saveTransactions};