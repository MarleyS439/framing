CREATE DATABASE framing;

DROP DATABASE framing;

USE framing;

-- Usuário
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(45) UNIQUE NOT NULL,
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    resumo VARCHAR(45),
    foto_path VARCHAR(255) NOT NULL DEFAULT '/assets/uploads/profile/perfil_default.png',
    capa_path VARCHAR(255) NOT NULL DEFAULT '/assets/uploads/profile/capa_default.png',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela temporária
CREATE TABLE temp (
    id INT PRIMARY KEY AUTO_INCREMENT,
    arquivo VARCHAR(255) NOT NULL,
    fk_id_usuario INT,
    CONSTRAINT fkUsuarioTemp
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);	

-- Post
CREATE TABLE post (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_usuario INT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    foto_path VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
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




SELECT * FROM post;

TRUNCATE TABLE post;

SELECT * FROM usuario;


SELECT id, titulo, foto_path, descricao, criado_em FROM post
	WHERE fk_id_usuario = 1;

DESC post;
DESC usuario;

SELECT 
	u.usuario,
	p.titulo,
	p.foto_path,
	p.descricao
FROM usuario u JOIN post p
	ON p.fk_id_usuario = u.id;







