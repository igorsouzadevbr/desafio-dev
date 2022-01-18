/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//SEÇÃO: Página padrão de upload de CNAB com envio direto ao banco de dados, o resto a API faz.
//Apenas Frontend.
import { useState } from 'react';
import { saveTransactions } from '../apiRequests/transactionService';

function App() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const sendTransactions = () => {
    if (file !== null) {
      setLoading(true);
      const formData = new FormData();

      formData.append('file', file);

      saveTransactions(formData)
        .then(({ message }) => {
          setMessage(message)
          setMessageType('success')
          setFile(null);
        })
        .catch(({ errors }) => {
          setMessage(errors[0])
          setMessageType('error')
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <>
      {
        <p className={ messageType === 'success' ? 'success-text' : 'error-text'}><strong>{ message }</strong></p>
      }
      <br/><br/>
      <p className='pTitle'>Envie o arquivo CNAB para testes.</p>
      <small className='sTitle'>PS: Verifique se o arquivo original está como solicitado.</small>
      <br/><br/>
      <br/><br/>
      <br/><br/>
      <form>
        <div className="file-input">
          <input
            type="file"
            id="file"
            className="file btn"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading}
          />
        </div>
        <br/><br/>
        <div
          className={ 'btn ' + (loading || file === null ? 'disabled' : '')}
          onClick={sendTransactions}
        >
          {
            loading === false
            ? 'Enviar'
            : 'Enviando...'
          }
        </div>
      </form>
    </>
  );
}

export default App;
