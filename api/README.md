# Desafio ByCoders

👨‍💻 Desenvolvedor: Igor Gabriel Marques de Souza
E-mail: igor@cadenzatecnologia.com.br

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