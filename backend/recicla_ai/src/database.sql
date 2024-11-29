create table if not exists microservice.users
(
    name               varchar(255) null,
    id                 int auto_increment primary key,
    email              varchar(255) null,
    cpf                varchar(255) null,
    points             varchar(255) null,
    birthdate          varchar(255) null,
    phone_number       varchar(255) null,
    recycle_preference varchar(255) null,
    password           varchar(255) null
);

create table if not exists microservice.companies
(
    name           varchar(255) null,
    email          varchar(255) null,
    cnpj           varchar(255) null,
    phone_number   varchar(255) null,
    postal_code    int          null,
    password       varchar(255) null,
    address_number varchar(255) null,
    id             int auto_increment primary key
);

create table if not exists microservice.recycle_address
(
    name           varchar(255) null,
    phone_number   varchar(255) null,
    postal_code    int          null,
    address_number varchar(255) null,
    recycle_preference varchar(255) null,
    id             int auto_increment primary key,
    company_id     int
);

CREATE TABLE if not exists products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          value VARCHAR(255),
                          description VARCHAR(255),
                          category VARCHAR(255),
                          quantity VARCHAR(255)
);

CREATE TABLE if not exists point_transaction (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   cpf VARCHAR(255) NOT NULL,
                                   quantity VARCHAR(255),
                                   transaction_date VARCHAR(255),
                                   company_id VARCHAR(255),
                                   recycle_address_id VARCHAR(255)
);

CREATE TABLE if not exists orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        cpf VARCHAR(255) NOT NULL,
                        product_id VARCHAR(255),
                        transaction_date VARCHAR(255)
);
