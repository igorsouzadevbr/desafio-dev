/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Realizar autenticação do usuário, frontend.
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, saveLoggedUser, signup } from '../apiRequests/authService';
import logobc from '../images/logobc.png';


//Função que realiza constantes de solicitação para a API de Login e Cadastro.
function Authentication(props) {
  const dispatch = useDispatch();
  const [isLogin,setIsLogin] = useState(true);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');


  const fazerLogin = () => {
    const user = { username, password }

    login(user)
      .then(response => {
        redireciona(response)
      })
      .catch(e => console.log(e))
      .finally(() => {
        setUsername('')
        setPassword('')
      })
  }

  const criarConta = () => {
    const user = { username, password }

    signup(user)
      .then(() => {
        setUsername('')
        setPassword('')
        setMessage('Usuário criado, realize o login.')
        setMessageType('success')
        setIsLogin(true)
      })
      .catch(e => {
        setMessage('Ocorreu um erro interno ao criar a conta, verifique o console (401 ou 500)')
        setMessageType('success')
      })
  }


  //Função constante para Redirecionar o usuário para a "UploadTransactions".
  const redireciona = async (user) => {
    dispatch({ type: 'LOGIN' });
    
    saveLoggedUser(user);
    
    const { history } = props;

    history.push('/');
  }

  return (
    
    <>
      {
        <p className={ messageType === 'success' ? 'success-text' : 'error-text'}><strong>{ message }</strong></p>
      }

      <br/><br/>
      
      <div className='formContent'>
      <div>
        <p>Bem-vindo ao SIF, identifique-se...</p>
      </div>
      <form className='login-form'>
        <label className='formLabel' htmlFor='username'>Usuário</label>
        <input className='inputForm' value={username} onChange={e => setUsername(e.target.value)} type='text' name='username' />
        <label className='formLabel' htmlFor='password'>Senha</label>
        <input className='inputForm' value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' />
        <br />
        {
          isLogin
          ? <a className='btn' onClick={() => fazerLogin()}>Acessar conta</a>
          
          : <a className='btn btnC' onClick={() => criarConta()}>Crie sua conta</a>
        }
      </form>
      
      <br />
        {
          
          isLogin
          ? <a className='btn btnC' onClick={() => setIsLogin(false)}>Crie sua conta</a>
          : <a className='btn' onClick={() => setIsLogin(true)}>Fazer login</a>
        }
   </div>
    </>
  );
}

export default Authentication
