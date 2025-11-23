var express = require("express");
var router = express.Router();

var usuarioController = require("../controller/usuarioController");

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.post("/confirmar/:id", function (req, res) {
  usuarioController.confirmarCapa(req, res);
});

router.post("/posts/:id", function (req, res) {
  usuarioController.listarPosts(req, res);
});

module.exports = router;
