CREATE DATABASE shopping;

\c shopping;

CREATE TABLE cosmetics (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    brand_id INTEGER REFERENCES brands(id) ON DELETE CASCADE,
    categoria VARCHAR(80) NOT NULL,
    price_cosmetic DECIMAL(10,2),
    quantidade_disponivel INTEGER NOT NULL,
    photo TEXT
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(250) NOT NULL,
    pais_origem VARCHAR(100)
);

INSERT INTO brands (nome, pais_origem) VALUES 
('Chanel', 'França'),
('Dior', 'França'),
('Natura', 'Brasil'),
('Avon', 'Estados Unidos'),
('O Boticário', 'Brasil'),
('Eudora', 'Brasil'),
('Boca Rosa', 'Brasil'),
('Johnson & Johnson', 'Estados Unidos'),
('Wepink', 'Brasil'),
('Nivea', 'Alemanha'),
('Lancôme', 'França'),
('Unilever', 'Reino Unido');

INSERT INTO cosmetics (nome, brand_id, categoria, quantidade_disponivel) VALUES
('Lipstick', 1, 'Makeup', 100),
('Foundation', 2, 'Makeup', 50),
('Shampoo', 3, 'Hair Care', 200),
('Conditioner', 4, 'Hair Care', 150);

DELETE TABLE brands;