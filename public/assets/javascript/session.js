// Validação de sessão e preenchimento de dados do usuário
function validarSessao() {
  const camposObrigatorios = [
    "USUARIO",
    "EMAIL_USUARIO",
    "NOME_USUARIO",
    "SOBRENOME_USUARIO",
    "FOTO_PERFIL",
    "ID_USUARIO",
    "CAPA_USUARIO"
  ];


  const dados = {};
  for (const campo of camposObrigatorios) {
    const valor = sessionStorage.getItem(campo);
    if (!valor) {
      return redirecionarLogin();
    }
    dados[campo] = valor;
  }

  preencherInterface(dados);
}

function redirecionarLogin() {
  window.location.href = "login.html";
}

function setConteudo(id, conteudo) {
  const elem = document.getElementById(id);
  if (elem) elem.innerHTML = conteudo;
}

function setValor(id, valor) {
  const elem = document.getElementById(id);
  if (elem) elem.value = valor;
}

function setSrc(id, src) {
  const elem = document.getElementById(id);
  if (elem) elem.src = src;
}

function setBackground(id, url) {
  const elem = document.getElementById(id);
  if (elem) elem.style.backgroundImage = `url(${url})`;
}

function preencherInterface({
  USUARIO,
  EMAIL_USUARIO,
  NOME_USUARIO,
  SOBRENOME_USUARIO,
  FOTO_PERFIL,
  CAPA_USUARIO
}) {
  const nomeCompleto = `${NOME_USUARIO} ${SOBRENOME_USUARIO}`;

  setConteudo("input_nome_post", `@${USUARIO}`);
  setConteudo("name_user", nomeCompleto);
  setConteudo("email_user", EMAIL_USUARIO);
  setConteudo("username", `@${USUARIO}`);

  setSrc("foto_perfil", FOTO_PERFIL);
  setSrc("foto_perfil_edit", FOTO_PERFIL);

  setValor("input_nome", NOME_USUARIO);
  setValor("input_username", USUARIO);
  setValor("input_sobrenome", SOBRENOME_USUARIO);
  setValor("input_email", EMAIL_USUARIO);

  setBackground("capa", CAPA_USUARIO);
}

