var database = require("../database/config");

// Função para autenticar usuário
function autenticar(email, senha) {
  console.log(
    `Autenticando usuário\n\nVerificando dados para:\nE-mail: ${email}\nSenha: ${senha}`
  );
  var sql = `
    SELECT id,
           usuario,
           nome,
           sobrenome,
           email,
           foto_path,
           capa_path,
           criado_em,
           atualizado_em
    FROM usuario
    WHERE usuario.email = '${email}'
        AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql);
}

// Função para cadastrar um usuário
function cadastrar(apelido, nome, sobrenome, email, senha) {
  console.log(
    `Cadastrando usuário\n\nDados a inserir:\nApelido: ${apelido}\nNome: ${nome}\nSobrenome: ${sobrenome}\nE-mail: ${email}\nSenha: ${senha}`
  );

  var sql = `
    INSERT INTO usuario
    VALUES (DEFAULT, '${apelido}', '${nome}', '${sobrenome}', '${email}', '${senha}', DEFAULT, DEFAULT, DEFAULT, DEFAULT);
  `;
  console.log("Executando a instrução:\n", sql);
  return database.executar(sql);
}

// FUnção para confirmar a capa do usuario
function confirmarCapa(id) {
  console.log("Confirmando a capa de usuário:\n" + "ID de usuário:", id);

  var sql = `
    UPDATE usuario
    SET capa_path = CONCAT('assets/uploads/images/',
                           (SELECT arquivo
                            FROM temp
                            WHERE fk_id_usuario = ${id} 
                            ORDER BY id 
                            DESC LIMIT 1)
                    )
    WHERE usuario.id = ${id};`;

  var select = `
    SELECT capa_path
    FROM usuario
    WHERE id = ${id};
  `;

  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql).then(function () {
    return database.executar(select);
  });
}

// Função para listar todos os posts do usuario
function listarPosts(id) {
  console.log("Executando consulta de posts do usuário de ID: ", id);

  var sql = `
    SELECT id,
          titulo,
          foto_path,
          descricao,
          criado_em
    FROM post
    WHERE fk_id_usuario = ${id};
  `;
  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql);
}

module.exports = {
  autenticar,
  cadastrar,
  confirmarCapa,
  listarPosts,
};
