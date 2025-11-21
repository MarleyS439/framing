var database = require("../database/config");

// Função para autenticar usuário
function autenticar(email, senha) {
  console.log(
    `Autenticando usuário\n\nVerificando dados para:\nE-mail: ${email}\nSenha: ${senha}`,
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
    `Cadastrando usuário\n\nDados a inserir:\nApelido: ${apelido}\nNome: ${nome}\nSobrenome: ${sobrenome}\nE-mail: ${email}\nSenha: ${senha}`,
  );

  var sql = `
    INSERT INTO usuario
    VALUES (DEFAULT, '${apelido}', '${nome}', '${sobrenome}', '${email}', '${senha}', NULL, DEFAULT, DEFAULT, DEFAULT, DEFAULT);
  `;
  console.log("Executando a instrução:\n", sql);
  return database.executar(sql);
}

module.exports = {
  autenticar,
  cadastrar,
};
