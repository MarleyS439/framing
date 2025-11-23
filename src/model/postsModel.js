var database = require("../database/config");

// Função para postar
function postar(post) {
  console.log("Fazendo um post de um usuário\n");

  var sql = `
    INSERT INTO post
    VALUES (DEFAULT, ${post.id}, '${post.titulo}', '${post.foto}', '${post.descricao}', DEFAULT);
  `;

  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql);
}

// Função para listar tudo
function listarTudo() {
  console.log("Fazendo uma listagem dos posts");

  var sql = `
  SELECT 
    u.usuario,
    p.titulo,
    p.foto_path,
    p.descricao
  FROM usuario u JOIN post p
	ON p.fk_id_usuario = u.id;`;

  console.log("Executando a instrução SQL: ", sql);
  return database.executar(sql);
}

// Função para listar todos os posts que não sejamk do proório usuário
function listarTudoMenosEu(id) {
  console.log("Listando todos os posts que não sejam do próprio usuário: ", id);

  var sql = `
    SELECT u.id,
       u.usuario,
       p.titulo,
       p.descricao,
       p.foto_path
    FROM post p
    JOIN usuario u ON p.fk_id_usuario = u.id
    WHERE p.fk_id_usuario <> ${id};
  `;
  console.log("Executnado a instrução SQL: ", sql);
  return database.executar(sql);
}

module.exports = {
  postar,
  listarTudo,
  listarTudoMenosEu,
};
