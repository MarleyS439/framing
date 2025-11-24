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
	(DEFAULT, 'Segundo e terceiro comentário sobre o post', 1, 2);

SELECT 
	u.usuario, 
	p.titulo,
	p.foto_path,
	p.descricao,
	p.criado_em
FROM usuario u JOIN post p
	ON p.fk_id_usuario = u.id
	ORDER BY p.criado_em DESC;
	
	
SELECT * FROM comentario;

SELECT 
	c.id idComentario,
	c.conteudo conteudo,
	c.fk_id_post idPost,
	c.fk_id_usuario idUsuario,
	u.usuario usuario
FROM comentario c JOIN usuario u
	ON c.fk_id_usuario = u.id;
	

TRUNCATE post_curtido;

DESC comentario;
	
SELECT
	p.id idPost,
	c.id idComentario,
	c.conteudo ConteudoComentario,
	u.usuario usuario,
	DATE_FORMAT(c.data_hora, '%d, %M de %Y')
FROM comentario c
JOIN usuario u
	ON c.fk_id_usuario = u.id
JOIN post p
	ON c.fk_id_post = p.id
	WHERE p.id = 1;
	
SELECT
      p.id idPost,
      c.id idComentario,
      c.conteudo ConteudoComentario,
      u.usuario usuario,
      DATE_FORMAT(c.data_hora, '%d, %M de %Y') data_hora
    FROM comentario c
    JOIN usuario u
      ON c.fk_id_usuario = u.id
    JOIN post p
      ON c.fk_id_post = p.id
      WHERE p.id = 4
		ORDER BY c.data_hora DESC;

SELECT
	COUNT(*) FROM post WHERE fk_id_usuario = 1;

SHOW TABLES;

SELECT * FROM comentario;

-- Quntidade de comentarios dos posts do usuario
SELECT
	COUNT(*) quantidadeComentarios
FROM comentario c
	JOIN usuario u 
		ON c.fk_id_usuario = u.id
			WHERE fk_id_usuario <> 1;

SELECT * FROM post_curtido;

-- Quantidade de curtidas nos posts do usuario (contagem de curtidas que não foi ele que deu)
SELECT
	p.titulo,
	COUNT(*) TotalCurtidas
FROM post_curtido pc JOIN post p
	ON pc.fk_id_post = p.id
WHERE pc.fk_id_usuario = 1 AND p.fk_id_usuario <> 1
	GROUP BY p.titulo;
	

SELECT * from usuario;

SELECT COUNT(*) from post_curtido pc;

SELECT
	p.id idPost,
	count(*)
from post_curtido pc JOIN post p 
	ON pc.fk_id_usuario = p.fk_id_usuario 
	WHERE pc.fk_id_usuario <>  GROUP BY p.id;



SELECT
	p.titulo,
	COUNT(*) totalCurtidas
FROM post_curtido pc JOIN post p
	ON pc.fk_id_post = p.id
WHERE pc.fk_id_usuario = 1 AND p.fk_id_usuario <> 1
	GROUP BY p.titulo;


-- Quantidade de curtidas que um usuaruio recebeu de seus posts
SELECT
    COUNT(*) AS totalCurtidas
FROM post_curtido pc
JOIN post p ON pc.fk_id_post = p.id
WHERE p.fk_id_usuario = 2
	AND pc.fk_id_usuario <> 2;

SELECT * FROM usuario;

SELECT
	COUNT(*) totalComentarios
FROM comentario c 
	JOIN post p 
		ON c.fk_id_post = p.id
	WHERE p.fk_id_usuario = 3
		AND c.fk_id_usuario <> 3;

SELECT * FROM post;

UPDATE post SET criado_em = '2026-01-01 00:00:00' WHERE id = 3;

ALTER TABLE post_curtido ADD COLUMN data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP();

TRUNCATE post_curtido;

SELECT * FROM post_curtido;

INSERT INTO post_curtido VALUES (2, 1, DEFAULT);

UPDATE post_curtido pc SET data_hora = '2025-12-01-01' WHERE fk_id_post = 2;

DESC post_curtido;

-- Quantidade de curtidas agrupadas por mes
SELECT
	DATE_FORMAT(pc.data_hora, '%M') mes,
    COUNT(*) AS totalCurtidas
FROM post_curtido pc
JOIN post p ON pc.fk_id_post = p.id
WHERE p.fk_id_usuario = 2
	AND pc.fk_id_usuario <> 2 GROUP BY mes;




