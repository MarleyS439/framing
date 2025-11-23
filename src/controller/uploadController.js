var uploadModel = require("../model/uploadModel");

// Função para enviar foto
function enviar(req, res) {
  const file = req.file.filename;
  const { id } = req.body;

  if (file == undefined) {
    res.status(400).send("Imagem está undefined");
  } else {
    uploadModel
      .enviar(file, id)
      .then((resultado) => {
        return res.status(201).json(resultado);
      })
      .catch((erro) => {
        console.log("Erro ao enviar foto:", erro);
        return res.status(500).send(erro);
      });
  }
}

// Função para enviar preview de imagens de usuário
function enviarPreview(req, res) {
  if (!req.file) {
    return res.status(400).send("Nenhuma imagem foi enviada.");
  }

  const file = req.file.filename;
  const { id } = req.body;

  uploadModel
    .enviar(file, id)
    .then(function (resultado) {
      return res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao enviar foto:", erro);
      return res.status(500).send(erro);
    });
}

// Função para buscar Preview
function buscarPreview(req, res) {
  var id = req.params.id;
  console.log(id);

  uploadModel
    .buscarPreview(id)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
}

/* // Função para postar
function postar(req, res) {
  var imagem = req.file.filename;
  var { id, titulo, foto_post, descricao } = req.body;
  var post = { id, titulo, foto_post, descricao, imagem };

  uploadModel
    .enviar(post)
    .then(function (resultado) {
      res.status(201).send("Post criado com sucesso");
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
} */

module.exports = { enviar, enviarPreview, buscarPreview };
