var database = require("../database/config");

// Função para enviar arvquivo
function enviar(arquivo, id) {
  console.log("Enviando arquivo...");

  const sql = `
    INSERT INTO temp (arquivo, fk_id_usuario)
    VALUES ('${arquivo}', ${id});
  `;
  console.log("Executando SQL:\n", sql);
  return database.executar(sql);
}

// Função para buscar uma imagem
function buscarPreview(id) {
  console.log("Fazendo uma busca pelo ID: ", id);
  var sql = `
    SELECT arquivo
    FROM temp
    WHERE fk_id_usuario = ${id}
    ORDER BY id DESC
    LIMIT 1;
  `;

  console.log("Executando SQL:\n", sql);
  return database.executar(sql);
}

module.exports = {
  enviar,
  buscarPreview,
};
