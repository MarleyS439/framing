var database = require("../database/config");

// Função para postar
function postar(idUsuario, titulo, foto_path, descricao) {
  console.log("Fazendo um post de um usuário\n\n");

  var sql = `
    INSERT INTO post
    VALUES (DEFAULT, ${idUsuario}, '${titulo}', '${foto_path}', '${descricao}', DEFAULT);
  `;

  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql);
}
