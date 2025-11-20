var usuarioModel = require("../model/usuarioModel");

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
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json(resultadoAutenticar);
        } else if (resultadoAutenticar.length == 0) {
          res.status(400).send("E-mail ou senha inválidos");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          `\nHouve um erro ao realizar o login. Erro: ${erro.sqlMessage}`,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

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
  autenticar,
};
