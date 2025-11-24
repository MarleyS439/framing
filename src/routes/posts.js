var express = require("express");
var router = express.Router();

var upload = require("../config/upload");

// PostsController
var postsController = require("../controller/postsController");

// Postar Post
router.post("/postar", upload.single("foto_post"), function (req, res) {
  postsController.postar(req, res);
});

// Listar Posts
router.get("/listarTudo", function (req, res) {
  postsController.listarTudo(req, res);
});

// Listar todos que não sejam meus
router.post("/listaTudoMenosEu/:id", function (req, res) {
  postsController.listarTudoMenosEu(req, res);
});

// Curtir
router.post("/curtir/:id", function (req, res) {
  postsController.curtir(req, res);
});

// COmentarios
router.post("/listarComentarios/:id", function (req, res) {
  postsController.listarComentarios(req, res);
});

// COmentar
router.post("/comentar/:id", function (req, res) {
  postsController.comentar(req, res);
});

// Quantidade de curtidas que recebeu
router.post("/dados/:id", function (req, res) {
  postsController.quantidadeCurtidasQueRecebeu(req, res);
});

// Quantidade de comentarios que recebeu
router.post("/comentarios/:id", function (req, res) {
  postsController.quantidadeComentariosQueRecebeu(req, res);
});

// Quantidade de curtidas por mes
router.post("/curtidasMes/:id", function (req, res) {
  postsController.quantidadeCurtidasMes(req, res);
});

// Quantidade de comentários por mes
router.post("/comentariosMes/:id", function (req, res) {
  postsController.quantiadeComentariosMes(req, res);
});

// Ranking de posts
router.post("/ranking/:id", function (req, res) {
  postsController.ranking(req, res);
});

// Quantidade de posts que curtiu
router.post("/curtiu/:id", function (req, res) {
  postsController.curtidas(req, res);
});
module.exports = router;
