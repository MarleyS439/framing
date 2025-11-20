var database = require("../database/config");

// Função para autenticar usuário
function autenticar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
  );
  var sql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

// Função para cadastrar um usuário
function cadastrar(apelido, nome, sobrenome, email, senha, status = 1) {
  console.log(
    "\nACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    apelido,
    nome,
    sobrenome,
    email,
    senha,
    status,
  );

  var sql = `INSERT INTO usuario
              (id, apelido, nome, sobrenome, email, senha, status)
            VALUES
              (DEFAULT, '${apelido}', '${nome}', '${sobrenome}', '${email}', '${senha}', ${status})`;

  console.log("Executando a instrução:\n" + sql);
  return database.executar(sql);
}

function possuiCadastro(email) {
  var sql = `SELECT email FROM usuario WHERE email = '${email}'`;

  console.log("Verificando se já existe um e-mail cadastrado");
  console.log("Executando: ", sql);
  database.executar(sql);
}

function existeUsuario(usuario) {
  var sql = `SELECT usuario FROM usuario WHERE usuario = ${usuario}`;
  console.log(
    "Verificar se já existe usuário com esse apelido gerado.\n Se erro, tentar novamente",
  );

  database.executar(sql);
}

module.exports = {
  autenticar,
  cadastrar,
  possuiCadastro,
  existeUsuario,
};
