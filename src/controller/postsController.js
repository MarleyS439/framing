const upload = require("../config/upload");
var postsModel = require("../model/postsModel");

// Função para postar um post de um Usuário
function postar(req, res) {
  var idUsuario = req.idUsuario;
  var titulo = req.titulo;
  var foto_path = req.foto_path;
  var descricao = req.descricao;

  if (idUsuario == undefined) {
    req.status(400).send("ID do Usuário está undefined");
  } else if (titulo == undefined) {
    req.status(400).send("Título está undefined");
  } else if (foto_path == undefined) {
    req.status(400).send("PATH da foto está undefined");
  } else if (descricao == undefined) {
    req.status(400).send("Descrição está undefined");
  } else {
    
    postsModel
      .postar(idUsuario, titulo, foto_path, descricao)
      .then((resultado) => {
        if (resultado) {
          return res.status(201).json(resultado);
        }
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

function deletar() {}

module.exports = {
  postar,
  deletar,
};
