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
      res.status(500).send(erro);
    });
}

// Função para listar todos os posts que não sejam do propŕio usuario
function listarTudoMenosEu(req, res) {
  var id = req.body.id;
  console.log("Listando todo os posts que não seja do usuário");

  postsModel
    .listarTudoMenosEu(id)
    .then(function (resultado) {
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Função para curtir um post
function curtir(req, res) {
  var idUsuario = req.body.idUsuario;
  var idPost = req.body.idPost;
  console.log(idPost, idUsuario);

  console.log("Realizando o like de post");

  postsModel
    .curtir(idPost, idUsuario)
    .then(function (resultado) {
      return res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Função para listar comentarios
function listarComentarios(req, res) {
  var idPost = req.body.idPost;
  console.log("Verificando comentários para o post de ID: " + idPost);

  postsModel
    .listarComentarios(idPost)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Função para comenta rum post
function comentar(req, res) {
  var idPost = req.body.idPost;
  var idUsuario = req.body.idUsuario;
  var comentario = req.body.comentario;

  console.log("COmentando um post");

  postsModel
    .comentar(idPost, idUsuario, comentario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(201).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// COntagem de curtidas que um usário recebeu
function quantidadeCurtidasQueRecebeu(req, res) {
  var idUsuario = req.body.idUsuario;

  console.log("Quantificando curtidas que o usuário recebeu");

  postsModel
    .quantidadeCurtidasQueRecebeu(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(err);
    });
}

// QUantidade comentários que recebeu
function quantidadeComentariosQueRecebeu(req, res) {
  var idUsuario = req.body.idUsuario;
  console.log("Quantificando comentários do usuário");

  postsModel
    .quantidadeComentariosQueRecebeu(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Quantidade de curtidas por mes
function quantidadeCurtidasMes(req, res) {
  var idUsuario = req.body.idUsuario;
  console.log("Quantificando curtidas do usuário por mês");

  postsModel
    .quantidadeCurtidasMes(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Quantidad de comentarios por mes
function quantiadeComentariosMes(req, res) {
  var idUsuario = req.body.idUsuario;
  console.log("Quantificando comentarios do usuário por mês");

  postsModel
    .quantiadeComentariosMes(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Função para buscar o rankind do usuario
function ranking(req, res) {
  var idUsuario = req.body.idUsuario;
  console.log("Ranqueando os posts curtidos do usuário");

  postsModel
    .ranking(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

// Função para verificar a quantidade de curtidas do usuario
function curtidas(req, res) {
  var idUsuario = req.body.idUsuario;
  console.log(
    "Consultando quantidade de posts que esse usário curtiu: ",
    idUsuario
  );

  postsModel
    .curtidas(idUsuario)
    .then(function (resultado) {
      console.log(resultado);
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).send(erro);
    });
}

module.exports = {
  postar,
  listarTudo,
  listarTudoMenosEu,
  curtir,
  listarComentarios,
  comentar,
  quantidadeCurtidasQueRecebeu,
  quantidadeComentariosQueRecebeu,
  quantidadeCurtidasMes,
  quantiadeComentariosMes,
  ranking,
  curtidas,
};
