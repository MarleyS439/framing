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
    foto_path VARCHAR(255) NOT NULL DEFAULT '/assets/uploads/profile/perfil_default.png',
    capa_path VARCHAR(255) NOT NULL DEFAULT '/assets/uploads/profile/capa_default.png',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela temporária para midias
CREATE TABLE temp (
    id INT AUTO_INCREMENT,
    arquivo VARCHAR(255) NOT NULL,
    fk_id_usuario INT,
    CONSTRAINT pkTemp
    	PRIMARY KEY (id, fk_id_usuario),
    CONSTRAINT fkUsuarioTemp
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);	

-- Post
CREATE TABLE post (
    id INT AUTO_INCREMENT,
    fk_id_usuario INT NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    foto_path VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pkPost
    	PRIMARY KEY (id, fk_id_usuario),
    CONSTRAINT fkUsuario
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);

-- Posts curtidos
CREATE TABLE post_curtido (
	fk_id_post INT NOT NULL,
	fk_id_usuario INT NOT NULL,
	CONSTRAINT pkPostCurtido
		PRIMARY KEY (fk_id_post, fk_id_usuario),
	CONSTRAINT fkPost
		FOREIGN KEY (fk_id_post)
			REFERENCES post (id),
	CONSTRAINT fkUsuarioPostCurtido
		FOREIGN KEY (fk_id_usuario)
			REFERENCES usuario (id)
);


-- Comentário
CREATE TABLE comentario (
    id INT AUTO_INCREMENT,
    conteudo VARCHAR(150) NOT NULL,
    fk_id_post INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pkComentario
        PRIMARY KEY (id, fk_id_post, fk_id_usuario),
    CONSTRAINT fkPostComentario
        FOREIGN KEY (fk_id_post)
            REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fkUsuarioComentario
        FOREIGN KEY (fk_id_usuario)
            REFERENCES usuario(id)
);


SELECT * FROM usuario;

SELECT * FROM post;

DESC usuario;
DESC post;

SELECT
	p.fk_id_usuario,
	u.usuario,
	u.email, 
	p.titulo,
	p.foto_path,
	p.descricao
FROM post p JOIN usuario u 
	ON p.fk_id_usuario = u.id;

DESC post_curtido;

INSERT INTO post_curtido VALUES (1, 2);

SELECT * FROM post_curtido;

TRUNCATE TABLE post_curtido;

SELECT 
       p.id AS idPost,
       u.id AS idUsuario,
       u.usuario,
       p.titulo,
       p.descricao,
       p.foto_path
    FROM post p
    JOIN usuario u ON p.fk_id_usuario = u.id
    WHERE p.fk_id_usuario <> 2;

DESC comentario;

INSERT INTO comentario (id, conteudo, fk_id_post, fk_id_usuario) VALUES 
	(DEFAULT, 'Primeiro comentário sobre o post', 1, 2);

SELECT 
	u.usuario, 
	p.titulo,
	p.foto_path,
	p.descricao
FROM usuario u JOIN post p
	ON p.fk_id_usuario = u.id
	
	
SELECT * FROM comentario;

SELECT 
	c.id idComentario,
	c.conteudo conteudo,
	c.fk_id_post idPost,
	c.fk_id_usuario idUsuario,
	u.usuario usuario
FROM comentario c JOIN usuario u
	ON c.fk_id_usuario = u.id;
	
	
	
