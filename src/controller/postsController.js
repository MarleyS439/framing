const upload = require("../config/upload");
var postsModel = require("../model/postsModel");

// Função para postar um post de um Usuário
function postar(req, res) {
  var foto = req.file.filename;

  var { id, titulo, descricao } = req.body;

  var post = { id, titulo, foto, descricao };

  if (id == undefined) {
    req.status(400).send("ID do Usuário está undefined");
  } else if (titulo == undefined) {
    req.status(400).send("Título está undefined");
  } else if (descricao == undefined) {
    req.status(400).send("Descrição do post está undefined");
  } else if (foto == undefined) {
    req.status(400).send("Foto está undefined");
  } else {
    console.log(post);
    postsModel
      .postar(post)
      .then((resultado) => {
        if (resultado) {
          return res.status(201).json(resultado);
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o post: " + erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Listar todos os posts de todos os usuários
function listarTudo(req, res) {
  console.log("Listando todos os posts");

  postsModel
    .listarTudo()
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(err);
    });
}

module.exports = {
  postar,
  listarTudo
};
