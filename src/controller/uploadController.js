var uploadModel = require("../model/uploadModel");

// Função para enviar foto
function enviar(req, res) {
  var file = req.file.filename;
  console.log(file);

  var { id } = req.body;

  var img = { id, file };

  if (file == undefined) {
    res.status(400).send("Imagem está undefined");
  } else {
    uploadModel
      .enviar(img)
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

  var file = req.file.filename;

  var { id } = req.body;

  var preview = { file, id };

  uploadModel
    .enviar(preview)
    .then(function (resultado) {
      console.log(preview);
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

// Função para enviar a foto de perfil
function enviarFotoPerfilPreview(req, res) {
  var id = req.params.id;
  console.log("Enviando foto de perfil");

  uploadModel
    .enviarFotoPerfilPreview()
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      res.status(500).send(erro);
    });
}

module.exports = {
  enviar,
  enviarPreview,
  buscarPreview,
  enviarFotoPerfilPreview,
};
