set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  DROP DATABASE IF EXISTS $APP_DB_NAME;
  CREATE DATABASE $APP_DB_NAME;
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $POSTGRES_USER;
  \connect $APP_DB_NAME $POSTGRES_USER
  BEGIN;
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
	    id SERIAL,
      username VARCHAR(255),
      password VARCHAR(255),
      PRIMARY KEY (id)
	  );


    DROP TABLE IF EXISTS shops;
    CREATE TABLE shops (
	    id SERIAL,
      name VARCHAR(45),
      owner VARCHAR(45),
      PRIMARY KEY (id)
	  );

    DROP TABLE IF EXISTS transaction_types;
    CREATE TABLE transaction_types (
	    id INT,
      description VARCHAR(45),
      nature VARCHAR(45),
      signal CHAR(1),
      PRIMARY KEY (id)
	  );

    DROP TABLE IF EXISTS transactions;
    CREATE TABLE transactions (
      id SERIAL,
      type_id INT,
      amount numeric(10,2),
      cpf VARCHAR(11),
      card_number VARCHAR(12),
      shop_id int,
      date TIMESTAMP WITH TIME ZONE,
      PRIMARY KEY (id),
      CONSTRAINT fk_type
        FOREIGN KEY (type_id)
        REFERENCES transaction_types (id),
      CONSTRAINT fk_shop
        FOREIGN KEY (shop_id)
        REFERENCES shops (id)
    );

    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('1','Débito', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('2','Boleto', 'Saída', '-');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('3','Financiamento', 'Saída', '-');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('4','Crédito', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('5','Recebimento Empréstimo', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('6','Vendas', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('7','Recebimento TED', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('8','Recebimento DOC', 'Entrada', '+');
    INSERT INTO transaction_types (id, description, nature, signal) VALUES ('9','Aluguel', 'Saída', '-');
  COMMIT;
EOSQL