CREATE DATABASE framing;

USE framing;

-- Usuário
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(45) NOT NULL,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    resumo VARCHAR(45),
    foto_path VARCHAR(255) NOT NULL DEFAULT 'public/assets/uploads/profile/profile_default.png',
    capa_path VARCHAR(255) NOT NULL DEFAULT 'public/assets/uploads/profile/capa_default.png',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Hashtag
CREATE TABLE hashtag (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hashtag VARCHAR(18) UNIQUE NOT NULL
);

-- Post
CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_usuario INT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    foto_path VARCHAR(255) NOT NULL,
    descricao VARCHAR(145) NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkUsuario
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);

-- Comentário
CREATE TABLE comentario (
    id INT AUTO_INCREMENT,
    conteudo VARCHAR(150) NOT NULL,
    fk_id_comentario_pai INT,
    fk_id_post INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pkComentario
        PRIMARY KEY (id, fk_id_post, fk_id_usuario),
    CONSTRAINT fkComentario
        FOREIGN KEY (fk_id_comentario_pai)
            REFERENCES comentario(id) ON DELETE CASCADE,
    CONSTRAINT fkPost
        FOREIGN KEY (fk_id_post)
            REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fkUsuarioComentario
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);

-- Relacional N Post : N Hashtag
CREATE TABLE post_hashtag (
    id INT AUTO_INCREMENT,
    fk_id_post INT NOT NULL,
    fk_id_hashtag INT NOT NULL,
    CONSTRAINT pkPostHashtag
        PRIMARY KEY (id, fk_id_post, fk_id_hashtag),
    CONSTRAINT fkPostHashtag
        FOREIGN KEY (fk_id_post)
            REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fkHashtag
        FOREIGN KEY (fk_id_hashtag)
            REFERENCES hashtag(id) ON DELETE CASCADE
);
