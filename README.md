# Desafio ByCoders

Desenvolvedor: Igor Gabriel Marques de Souza
E-mail: igor@cadenzatecnologia.com.br

## 👨‍💻 Tech

#### Backend (API)
- Node
- PostgreSQL 13.1
(Dependências diretas: sequelize, jwt, bcrypt, express, axios, react, router)
#### Frontend
- React.js
- HTML
- CSS3
##
### Começar

É necessário instalar na máquina o node.js & postgresql antes de utilizar. O sistema funciona melhor em maquinas linux.

- [Node](https://nodejs.org/)
- [Postgre](https://www.postgresql.org/download/)

## Instalação
Indico utilizar o Docker.
### Docker composer
```docker-compose up --build -d```

### Configure o .env
Defina os valores das variáveis: *db_host*, *db_port*, *db_username* & *db_password*

- Não vai utilizar Docker?
Converta o script localizado no dbScript/script.sh para sql, apenas copiando o comando completo.

## Executar o projeto manualmente

### API
O servidor está configurado para a porta 5000.

Iniciando a API:

```
cd api

# Certifique-se de instalar as dependências do servidor.

npm start #ou node ./index.js
```

## Documentação API
#### Autenticação
- *`POST` `/api/login`* (logon)
- *`POST` `/api/signup`* (signup)

#### Lojas
OBS: para utilizar as seções de API abaixo, você precisar estar autenticado com login, que irá gerar um token via retorno 200, utilize-o na /oapi, caso contrário irá retornar mensagem de erro.
- *`GET` `/oapi/shops`* (shop list)

#### Transações
- *`GET` `/oapi/transactions`* (transaction list)
- *`GET` `/oapi/transactions?shop_id=...`* (transaction of a unique shop)
- *`POST` `/oapi/transactions`* (save a CNAB file)

#### Tipos de transações
- *`GET` `/oapi/transactions-types`* (saved transaction types list)

### Web
A aplicação está configurada para a porta 3000.

Iniciando o WEB React:

```
cd web

# Certifique-se de instalar as dependências do app.

npm start #ou node ./index.js
```


### Testes automatizados
Inicie normalmente e execute os comandos abaixo:

```
# Certifique-se de instalar as dependências do app & api.

npm test
```






