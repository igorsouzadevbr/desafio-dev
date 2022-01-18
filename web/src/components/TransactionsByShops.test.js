/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//SEÇÃO DE TESTES DE TRANSAÇÕES POR LOJA VIA react-dom & axios.
import React from "react";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TransactionsByShops from "./TransactionsByShops";
import { formatCurrency, formatDate } from "../utils/functions";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

jest.mock('axios');

test("Checar quando houverem transações", async () => {
  const data = [
    {
      id: 1,
      type_id: 1,
      type: {
        description: 'Débito',
        nature: 'Entrada',
        signal: '+'
      },
      amount: 99.99,
      cpf: '09620676017',
      card_number: '4753****3153',
      shop_id: 1,
      date: '2021-08-16T16:31:53.596Z'
    },
    {
      id: 2,
      type_id: 2,
      type: {
        description: 'Boleto',
        nature: 'Saída',
        signal: '-'
      },
      amount: 99.99,
      cpf: '55641815063',
      card_number: '3123****7687',
      shop_id: 1,
      date: '2021-08-17T09:01:43.596Z'
    }
  ]

  axios.get.mockImplementation(() => Promise.resolve(data));
  
  await act(async () => {
    render(<BrowserRouter><TransactionsByShops match={{ params: { shop_id: 1 } }} /></BrowserRouter>, container);
  });

  const rows = Array.from(container.querySelectorAll('tbody tr'))

  const transactions = []

  rows.forEach(async ({ cells }) => {
    transactions.push({
      date: cells[1].textContent,
      cpf: cells[2].textContent,
      card_number: cells[3].textContent,
      type: cells[4].textContent,
      amount: cells[5].textContent
    })
  })

  const modifiedData = data.map(item => ({ date: formatDate(item.date), cpf: item.cpf, card_number: item.card_number, type: item.type.description, amount: formatCurrency(item.amount) }))

  expect(transactions).toEqual(modifiedData)
});

test('Checar quando não houver transações', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  
  await act(async () => {
    render(<BrowserRouter><TransactionsByShops match={{ params: { shop_id: 1 } }} /></BrowserRouter>, container);
  });

  expect(container.querySelector('.not-found').textContent).toBe('Nenhuma transação encontrada. Você já deu upload no CNAB?')
});
