/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Navbar comum, modelo padrão do React.


import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../apiRequests/authService';
import logobc from '../images/logobc.png';

function Navbar() {
  const { isAuthenticated } = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const sair = () => {
    dispatch({ type: 'LOGOUT' });
    logout()
  }

  return (
    <header className="appHeader">
      <Link to={ isAuthenticated ? '/' : '/authentication'}><img alt='Logo' src={logobc} width={150}></img></Link>
      <br></br>
      <ul>
    
        
        
  
        {
          isAuthenticated &&
          <li>
            <Link className='linkNav' data-testid='shops' to={'/shops'}>Ver lojas</Link>
          </li>
        }
        {
          isAuthenticated &&
          <li>
            <a className='linkNav' href='#' onClick={() => sair()}>Sair do sistema</a>
          </li>
        }
      </ul>
    </header>
  );
}

export default Navbar;