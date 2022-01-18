/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//Aqui realizamos a conexão ao serviço de Autenticação em nossa API, código simples e padrão.
import axios from './api'


//Função constante para realizar o cadastro do usuário
const signup = (user) => axios.post('http://localhost:5000/api/signup', user);


//Função constante para realizar login do usuário
const login = (user) => axios.post('http://localhost:5000/api/login', user);


//Função constante para realizar logout do usuário do sistema
const logout = () => {
  localStorage.removeItem('USER_LOGGED');
  localStorage.removeItem('TOKEN');
  window.location.assign('/authentication');
};

//Função constante para verificar o usuário que está logado no sistema
const getLoggedUser = () => {
  const user = localStorage.getItem('USER_LOGGED');

  if (user) return JSON.parse(user);

  return null;
};


//Função constante que verifica se o usuário está logado
const isAuthenticated = () => {
  const user = getLoggedUser();

  return user !== null;
}


//Função constante que salva o usuário logado.
const saveLoggedUser = ({ token, ...user }) => {
  localStorage.setItem('TOKEN', token);
  localStorage.setItem('USER_LOGGED', JSON.stringify(user));
};


//Função constante que localiza o token gerado via API.
const getToken = () => localStorage.getItem('TOKEN')



//Aqui exportamos as funções.
export { signup, login, logout, getLoggedUser, isAuthenticated, saveLoggedUser, getToken }