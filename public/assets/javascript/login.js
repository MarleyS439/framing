document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("input_email");
  const email = emailInput.value;

  const button = document.getElementById("button_login");

  const messagemDiv = document.getElementById("messages");

  button.addEventListener("click", () => {
    if (!email.includes("@") && !email.includes(".com")) {
      messagemDiv.innerHTML = `E-mail ou senha inválidos`;
    }
  });
});
