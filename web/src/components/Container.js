/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//Função simples de container para organizar itens no centro, idêntico ao Bootstrap no HTML5.
function Container(props) {
  return (
    <div className='container'>
      { props.children }
    </div>
  );
}

export default Container;
