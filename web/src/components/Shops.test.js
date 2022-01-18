/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/
//SEÇÃO DE TESTES AUTOMATIZADOS VIA react-dom & axios...
import React from "react";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Shops from "./Shops";

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

test("Checar quando acharmos lojas", async () => {
  const data = [
    {
      id: 1,
      name: 'Shop 1',
      owner: 'Owner 1'
    },
    {
      id: 2,
      name: 'Shop 2',
      owner: 'Owner 2'
    }
  ]

  axios.get.mockImplementation(() => Promise.resolve(data));
  
  await act(async () => {
    render(<BrowserRouter><Shops /></BrowserRouter>, container);
  });

  const rows = Array.from(container.querySelectorAll('tbody tr'))

  const shops = []

  rows.forEach(async ({ cells }) => {
    shops.push({ id: Number(cells[0].textContent), name: cells[1].textContent, owner: cells[2].textContent })
  })

  expect(shops).toEqual(data)
});

test('Checar quando não houverem lojas no bd', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
  
  await act(async () => {
    render(<BrowserRouter><Shops /></BrowserRouter>, container);
  });

  expect(container.querySelector('.not-found').textContent).toBe('Lojas não localizadas. Você já deu upload no CNAB?')
});
