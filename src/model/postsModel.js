var database = require("../database/config");

// Função para postar
function postar(post) {
  console.log("Fazendo um post de um usuário\n");

  var sql = `
    INSERT INTO post
    VALUES (DEFAULT, ${post.id}, '${post.titulo}', '${post.foto}', '${post.descricao}', DEFAULT);
  `;

  console.log("Executando a instrução SQL: \n", sql);
  return database.executar(sql);
}

// Função para listar tudo
function listarTudo() {
  console.log("Fazendo uma listagem dos posts");

  var sql = `
  SELECT 
    u.usuario,
    p.titulo,
    p.foto_path,
    p.descricao
  FROM usuario u JOIN post p
	ON p.fk_id_usuario = u.id;`;

  console.log("Executando a instrução SQL: ", sql);
  return database.executar(sql);
}

// Função para listar todos os posts que não sejamk do proório usuário
function listarTudoMenosEu(id) {
  console.log("Listando todos os posts que não sejam do próprio usuário: ", id);

  var sql = `
    SELECT 
       p.id AS idPost,
       u.id AS idUsuario,
       u.usuario,
       p.titulo,
       p.descricao,
       p.foto_path
    FROM post p
    JOIN usuario u ON p.fk_id_usuario = u.id
    WHERE p.fk_id_usuario <> ${id} ORDER BY p.id DESC;
  `;
  console.log("Executnado a instrução SQL: ", sql);
  return database.executar(sql);
}

// Função para curtir um post
function curtir(idPost, idUsuario) {
  console.log("Curtindo um post");

  var sql = `
    INSERT INTO post_curtido
    VALUES (${idPost}, ${idUsuario}, DEFAULT);
  `;

  console.log("Executando a instrução SQL: ", sql);
  return database.executar(sql);
}

// Funçção para listar comentarios
function listarComentarios(idPost) {
  console.log("Listando comentarios para o post de ID: " + idPost);

  var sql = `
    SELECT
      p.id idPost,
      c.id idComentario,
      c.conteudo ConteudoComentario,
      u.usuario usuario,
      DATE_FORMAT(c.data_hora, '%d, %M de %Y') data_hora
    FROM comentario c
    JOIN usuario u
      ON c.fk_id_usuario = u.id
    JOIN post p
      ON c.fk_id_post = p.id
      WHERE p.id = ${idPost} ORDER BY c.data_hora DESC;
  `;
  console.log("Executando a instrução SQL:" + sql);

  return database.executar(sql);
}

// Função para comentar
function comentar(idPost, idUsuario, comentario) {
  console.log("Realizando o registro de comentário");

  var sql = `
    INSERT INTO comentario (id, conteudo, fk_id_post, fk_id_usuario)
    VALUES (DEFAULT, '${comentario}', ${idPost}, ${idUsuario});
  `;

  console.log("Exeutando a instrução SQL", sql);
  return database.executar(sql);
}

// FUnção para puxar a quanrtidad de curtidas do usuario (que recebeu)
function quantidadeCurtidasQueRecebeu(idUsuario) {
  console.log("Verificando quantidade de curtidas");

  var sql = `
    SELECT COUNT(*) AS totalcurtidas
    FROM post_curtido pc
    JOIN post p ON pc.fk_id_post = p.id
    WHERE p.fk_id_usuario = ${idUsuario}
        AND pc.fk_id_usuario <> ${idUsuario};
  `;

  console.log("Executando consulta: ", sql);

  return database.executar(sql);
}

function quantidadeComentariosQueRecebeu(idUsuario) {
  console.log(
    "Verificando quantidade de comentários deste usuário: ",
    idUsuario
  );

  var sql = `
    SELECT 
      COUNT(*) totalcomentarios
    FROM comentario c
    JOIN post p ON c.fk_id_post = p.id
      WHERE p.fk_id_usuario = ${idUsuario}
        AND c.fk_id_usuario <> ${idUsuario};
  `;

  console.log("Executando instrução SQL:", sql);
  return database.executar(sql);
}

// Função para quantificar curtidas por mes
function quantidadeCurtidasMes(idUsuario) {
  console.log("Qunantificando as curtidas do usuário por mês: ", idUsuario);

  var sql = `
    SELECT 
      date_format(pc.data_hora, '%M') mes,
      COUNT(*) AS totalcurtidas
    FROM post_curtido pc
    JOIN post p ON pc.fk_id_post = p.id
      WHERE p.fk_id_usuario = ${idUsuario}
        AND pc.fk_id_usuario <> ${idUsuario}
    GROUP BY mes;
  `;
  console.log("Executando a instrução SQL\n", sql);
  return database.executar(sql);
}

// Função para quantificar por mes a quantiade de comentarios que um usuario recebeu
function quantiadeComentariosMes(idUsuario) {
  console.log(
    "Quantifiacando os comentarios que o usuário recebeu: ",
    idUsuario
  );

  var sql = `
    SELECT date_format(c.data_hora, '%M') mes,
       COUNT(*) AS totalcomentariosmes
    FROM comentario c
    JOIN post p ON c.fk_id_post = p.id
    WHERE p.fk_id_usuario = ${idUsuario}
        AND c.fk_id_usuario <> ${idUsuario}
    GROUP BY mes;
  `;

  console.log("Executando a instrução SQL: \n", sql);

  return database.executar(sql);
}

// Função para ranquear os posts que foram curtidis do usuario
function ranking(idUsuario) {
  console.log("Ranqueando...");

  var sql = `
    SELECT 
      p.id AS idpost,
      p.titulo,
      p.fk_id_usuario,
      COUNT(pc.fk_id_usuario) AS totalcurtidas
    FROM post p
    JOIN post_curtido pc ON p.id = pc.fk_id_post
    WHERE p.fk_id_usuario = ${idUsuario}
    GROUP BY p.id,
      p.titulo,
      p.fk_id_usuario
    ORDER BY totalcurtidas DESC;
  `;

  console.log("Executando a instrução SQL\n", sql);

  return database.executar(sql);
}

// Função para verificar quantidade de curtidas que o usuário deu
function curtidas(idUsuario) {
  console.log("Verificando quantidade de curtidas que deu");

  var sql = `
    SELECT
      COUNT(*) curtidas
    FROM post_curtido
    WHERE fk_id_usuario = ${idUsuario};
  `;

  console.log("Executando a instrução SQL:\n", sql);
  return database.executar(sql);
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
