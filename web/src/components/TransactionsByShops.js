/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Aqui organizo a questão de transações por loja, definindo o quanto foi gasto, tipos, sinal, natureza e valor final ao bottom.
import { useEffect, useState } from 'react';
import { getTransactions } from '../apiRequests/transactionService';
import { formatCurrency, formatDate } from '../utils/functions';

function TransactionsByShops(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const { match: { params: { shop_id } } } = props;

    getAllTransactionsShops(shop_id)
  }, [props]);

  const getAllTransactionsShops = (shop_id) =>
    getTransactions({ shop_id })
      .then((response) => setTransactions(response))

  const finalBalance = (transactions) => {
    const balance = transactions.reduce((balance, { amount, type }) => balance + parseFloat(type.signal + amount), 0);

    return balance;
  }

  return (
    <>
      {
        transactions.length > 0
        ? (
          <table className="table">
            <thead>
              <tr>
                <th>Nat.</th>
                <th>Data</th>
                <th>CPF Cliente</th>
                <th>Núm. do Cartão</th>
                <th>Tipo de Transação</th>
                <th>Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {
                transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>
                      {
                        transaction.type.signal === '+'
                        ? <span className='success-text'>&#9650;</span>
                        : <span className='error-text'>&#9660;</span>
                      }
                    </td>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.cpf}</td>
                    <td>{transaction.card_number}</td>
                    <td>{ transaction.type.description }</td>
                    <td style={{ textAlign: 'right' }}>{formatCurrency(transaction.amount)}</td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>Final das Operações</td>
                <td style={{ textAlign: 'right' }}>{ formatCurrency(finalBalance(transactions)) }</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className='not-found'>
            Nenhuma transação encontrada. Você já deu upload no CNAB?
          </div>
        )
      }
    </>
  );
}

export default TransactionsByShops;
