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

module.exports = router;
