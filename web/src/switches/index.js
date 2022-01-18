/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
import {combineReducers} from 'redux';
import userLoggedReducer from './userLoggedReducer';

const reducer = combineReducers({
  userData: userLoggedReducer
});

 export default reducer;