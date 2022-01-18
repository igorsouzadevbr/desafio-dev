/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//Semelhante a uma constante ENUM do java & cookies do php/js, apenas atualizo o sistema dizendo que o usuário irá deslogar.
export const logoutAction = data => ({
  type: 'LOGOUT',
  payload: data
})