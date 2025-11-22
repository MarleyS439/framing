var express = require("express");
var router = express.Router();

var postsController = require("../controller/postsController");

router.post("/postar", function (req, res) {
  postsController.postar(req, res);
});

router.post("/listar", function (req, res) {
  postsController.listar(req, res);
});
