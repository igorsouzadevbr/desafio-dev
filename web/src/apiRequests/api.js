/*
REVISÃO DE CÓDIGO & COMMENT - DEVOPS - 18/01 - 06:30
Engenheiro de Software: Igor S. <igor@cadenzatecnologia.com.br>

Situação: Ok.
Linguagem: Typescript Node.JS, 

Data Início: 18/01 - MADRUGADA
Data Finalização: 18/01 - MADRUGADA
*/

//Aqui realizamos a requisição via código padrão do axios para conectar a api.
import { getToken, logout } from './authService'
import axios from 'axios' 

axios.interceptors.request.use(async config => {
  const token = getToken()

  if (token)
    config.headers.Authorization = token

  return config
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  if (error.response) {
    if (error.response.status == 403) {
      logout()
      return
    }
  } else if (error.request) {
    const erro = 'ERRO AO CONECTAR'
    return Promise.reject(erro)
  }

  const erro = error.response.data.errors && error.response.data.errors[0]
  return Promise.reject(erro)
})

export default axios