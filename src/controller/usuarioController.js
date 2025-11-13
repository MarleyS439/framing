var usuarioModel = require("../model/usuarioModel");

function cadastrar(req, res) {
  var apelido = req.body.apelidoServer;
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var status = req.body.statusServer;

  if (apelido == undefined) {
    res.status(400).send("Apelido de usuário está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("Nome do usuário está undefined!");
  } else if (sobrenome == undefined) {
    res.status(400).send("Sobrenome do usuário está undefined!");
  } else if (email == undefined) {
    res.status(400).send("E-mail do usuário está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Senha do usuário está undefined!");
  } else {
    // Adicionar uma validação para nome de usuário logo acima
    usuarioModel
      .cadastrar(apelido, nome, sobrenome, email, senha, status)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
};
