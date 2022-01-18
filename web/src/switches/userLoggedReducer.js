/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//Semelhante a uma constante ENUM do java & cookies do php/js, apenas atualizo o sistema organizando as seções de LOGIN, LOGOUT e não logado.
const initialState = { isAuthenticated: false };

const action = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true }
    case 'LOGOUT':
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

export default action