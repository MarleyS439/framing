// Função para validar a sessão
function validarSessao() {
  var usuario = sessionStorage.USUARIO;
  var email = sessionStorage.EMAIL_USUARIO;
  var nome = sessionStorage.NOME_USUARIO;
  var sobrenome = sessionStorage.SOBRENOME_USUARIO;
  var foto = sessionStorage.FOTO_PERFIL;

  if (
    usuario == null ||
    email == null ||
    nome == null ||
    sobrenome == null ||
    foto == null
  ) {
    window.location = "login.html";
  } else {
    var htmlUsuario = document.getElementById("username");
    var htmlEmail = document.getElementById("email_user");
    var htmlNome = document.getElementById("name_user");
    var htmlFoto = document.getElementById("foto_perfil");

    var nomeCompletoExibir = `${nome} ${sobrenome}`;
    var emailExibir = `${email}`;
    var usuarioExibir = `@${usuario}`;

    htmlNome.innerHTML = nomeCompletoExibir;
    htmlEmail.innerHTML = emailExibir;
    htmlUsuario.innerHTML = usuarioExibir;
    htmlFoto.src = foto;
    console.log(htmlFoto.src);
  }
}
