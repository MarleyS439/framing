function generateUsername(nome, sobrenome) {
  var nomeMinusculo = nome.toLowerCase();
  var sobrenomeMinusculo = sobrenome.toLowerCase();

  var numeroAleatorio = () => {
    return Math.random() * 1000;
  };

  return nomeMinusculo + sobrenome + numeroAleatorio;
}
