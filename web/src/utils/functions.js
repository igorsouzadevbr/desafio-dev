/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//Funções para organizar a questão de data/hora & formato de moeda. padrão do JS, funções facilmente encontradas.
const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  return new Date(date).toLocaleDateString('pt-BR', options) ?? '-'
}

const formatCurrency = (value) => {
  const options = {
    style: 'currency',
    currency: 'BRL'
  };

  return new Intl.NumberFormat('pt-BR', options).format(value)
}

module.exports = {
  formatDate,
  formatCurrency
}