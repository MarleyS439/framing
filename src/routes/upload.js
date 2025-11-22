var express = require("express");
var router = express.Router();
var uploadController = require("../controller/uploadController");
const upload = require("../config/upload");

// Enviar post
router.post("/enviar", upload.single("foto"), function (req, res) {
  uploadController.enviar(req, res);
});

// Trazer as imagens
router.post("/trazer", upload.single("foto"), function (req, res) {
  uploadController.trazer(req, res);
});

// Enviar capa
router.post("/enviar/capa", upload.single("foto_capa"), function (req, res) {
  uploadController.enviarPreview(req, res);
});

// Obter preview
router.get("/preview/:id", function (req, res) {
  uploadController.buscarPreview(req, res);
});

module.exports = router;
