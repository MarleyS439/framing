CREATE DATABASE framing;

USE framing;

-- Usuário
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apelido VARCHAR(12) UNIQUE NOT NULL,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    `status` TINYINT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chkStatus
        CHECK (`status` = 0 or `status` = 1)
);
