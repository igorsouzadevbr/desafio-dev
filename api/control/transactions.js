/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 17/01 - 03:10
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 
Frameworks/Depends: sequelize, postgre, bcrypt, jwt, pg, dotenv, express & http.

Data Início: 17/01
Data Finalização: 17/01
*/

//Variáveis para controle geral do banco de dados onde pegamos toda a estrutura modelo.
var Transaction = require('../modelDatabase/transactions');
var TransactionType = require('../modelDatabase/transactions-types');


//Função para pegar TODAS as transações e organizar por tipo
const getTransactions = async(query={})=>{
    try {
        //Constante que pega todas as transações disponíveis no banco de dados e define a organização modelo por tipo.
        const transactions = await Transaction.findAll({where:query,include:[{model:TransactionType, as:'type'}]});
        return transactions;
    } catch {
        throw new Error('Erro ao buscar transações');
    }


};


//Função para pegar uma única transação organizada por ID requisitado.
const getUnique = async(id)=> {
    try {
        //Constante que pega a transação por id único localizado.
        const transaction = await Transaction.findByPk(id);
        return transaction;    
    } catch {
        throw new Error('Erro ao buscar transação');
    }
};


//Função para adicionar transações do arquivo CNAB, dividi unicamente para organizar melhor.
const saveTransactions = async(transaction, shop_id)=>{
    try {
        //Constantes que organizam os dados de acordo com requisitado e enviam para o banco de dados.
        const {date,amount,cpf,card_number,type_id} = transaction;
        const new_transaction = await Transaction.create({
            date,
            amount,
            cpf,
            card_number,
            type_id,
            shop_id,
        });
        return new_transaction;
    } catch (e) {
        throw new Error(e.message);
    }
};

//Aqui exportamos as funções
module.exports={getTransactions,getUnique,saveTransactions};