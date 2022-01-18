/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Realizar consulta de Lojas dentro da API e retornar via tabela, após isso estilizar com CSS.
import { useEffect, useState } from 'react';
import { getShops } from '../apiRequests/shopService';
import { Link } from 'react-router-dom';

function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getAllShops()
  }, []);

  const getAllShops = () =>
  getShops()
      .then((response) => setShops(response))
      .catch(e => console.error(e))

  return (
    <>
      {
        shops.length > 0
        ? (
          <table data-testid="table-shops" className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Nome</th>
                <th>Dono</th>
                <th>Utilidades</th>
              </tr>
            </thead>
            <tbody>
              {
                shops.map(shop => (
                  <tr key={shop.id}>
                    <td>{shop.id}</td>
                    <td data-testid='shop-name'>{shop.name}</td>
                    <td data-testid='shop-owner'>{shop.owner}</td>
                    <td><Link to={`./shops/transactions/${shop.id}`}>Ver moviment.</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <div data-testid='shops-not-found' className='not-found'>
            Lojas não localizadas. Você já deu upload no CNAB?
          </div>
        )
      }
    </>
  );
}

export default Shops;
