/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Função para realizar consulta de todas as transações e salvar(caso seja a requisição)

import axios from './api'

const getTransactions = (params) => {
  const url_params = new URLSearchParams(params).toString();

  return axios.get(`http://localhost:5000/oapi/transactions?${url_params}`);
}

const saveTransactions = (file) => axios.post(`http://localhost:5000/oapi/transactions`, file, { "Content-Type": "multipart/form-data" })

export {
  getTransactions,
  saveTransactions
}