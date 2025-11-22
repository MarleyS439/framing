var usuarioModel = require("../model/usuarioModel");

// Função controller para autenticar usuário
function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu e-mail está undefined");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined");
  } else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultado) {
        if (resultado.length == 1) {
          return res.status(201).json(resultado[0]);
        } else if (resultado.length == 0) {
          return res.status(403).send("E-mail ou senha inválidos");
        } else {
          return res
            .status(403)
            .send("Mais de um usuário com mesmo login e senha");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao autenticar o usuário: ",
          erro.sqlMessage,
        );
        return res.status(500).json(erro.sqlMessage);
      });
  }
}

// Função controller para cadastrar usuário
function cadastrar(req, res) {
  var apelido = req.body.apelidoServer;
  var nome = req.body.nomeServer;
  var sobrenome = req.body.sobrenomeServer;
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (apelido == undefined) {
    res.status(400).send("Seu apelido está undefined");
  } else if (nome == undefined) {
    res.status(400).send("Seu nome está undefined");
  } else if (sobrenome == undefined) {
    res.status(400).send("Seu sobrenome está undefined");
  } else if (email == undefined) {
    res.status(400).send("Seu e-mail está undefined");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined");
  } else {
    usuarioModel
      .cadastrar(apelido, nome, sobrenome, email, senha)
      .then((resultado) => {
        return res.status(201).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro: " + erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
  autenticar,
};
