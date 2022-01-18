/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO: Padrão App.js do React, sem mudanças tão exorbitantes, apenas solicitei todas as funções e as organizei de acordo com necessidade.

import { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, useSelector } from 'react-redux'
import UploadTransactions from './UploadTransactions';
import Shops from './Shops';
import TransactionsByShops from './TransactionsByShops';
import Navbar from './Navbar';
import Container from './Container';
import Authentication from './Authentication';
import reducer from '../switches';
import '../assets/css/style.css';

const shop = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <Provider store = {shop}>
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Container>
            <Switch>
              <Suspense fallback={Loading}>
                <Route exact path={'/authentication'} component={props => <Authentication {...props} />} />
                <PrivateRoute exact path={'/'} component={props => <UploadTransactions {...props} />} />
                <PrivateRoute exact path={'/shops'} component={props => <Shops {...props} />} />
                <PrivateRoute path={'/shops/transactions/:shop_id'} component={props => <TransactionsByShops {...props} />} />
              </Suspense>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.userData);

  return (
    <Route { ...rest } render={ props => isAuthenticated
      ? <Component { ...props } />
      : <Redirect to={`/authentication`} />
      }
    />
  )
};

const Loading = (
  <p>Carregando...</p>
)

export default App;
