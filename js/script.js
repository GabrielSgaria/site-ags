let width = window && window.screen.width;
let perview = 3;

if (width <= 481) {
  perview = 1;
}else {
  perview = 3;
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: perview,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Formspree

let form = document.getElementById("form-orc");
const obgName = document.getElementById("obg-name");
const obgEmail = document.getElementById("obg-email");
const obgTelefone = document.getElementById("obg-telefone");
const obgMensagem = document.getElementById("obg-mensagem");
const formulario = document.getElementById("form-orc");
const btnEnviar = document.getElementById("btn-enviar");

function enviarForm(e) {
  e.preventDefault();
  btnEnviar.disabled = true;
  btnEnviar.innerText = "Enviando...";

  let status = document.querySelector(".my-form-status");
  let data = new FormData(e.target);

  const name = data.get("name");
  const email = data.get("email");
  const telefone = data.get("telefone");
  const mensagem = data.get("mensagem");

  let erro = false;

  obgName.innerHTML = "";
  obgEmail.innerHTML = "";
  obgTelefone.innerHTML = "";
  obgMensagem.innerHTML = "";

  if (name === "") {
    obgName.innerHTML = "Campo obrigatório! ";
    erro = true;
  }
  if (email === "") {
    obgEmail.innerHTML = "Campo obrigatório!";
    erro = true;
  }
  if (telefone === "") {
    obgTelefone.innerHTML = "Campo obrigatório!";
    erro = true;
  }
  if (mensagem === "") {
    obgMensagem.innerHTML = "Campo obrigatório!";
    erro = true;
  }
  if (erro) {
    btnEnviar.disabled = false;
    btnEnviar.innerText = "Enviar";
  }
  if (erro) return;

  erro = false;
  obgName.innerHTML = "";
  obgEmail.innerHTML = "";
  obgTelefone.innerHTML = "";
  obgMensagem.innerHTML = "";

  fetch("https://formspree.io/f/xaygvrde", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (Object.hasOwn(data, "errors")) {
        status.innerHTML = "O orçamento não foi enviado !";
        status.classList.add("form-error");
        btnEnviar.disabled = false;
        btnEnviar.innerText = "Enviar";
        console.error(
          data["errors"].map((error) => error["message"]).join(", ")
        );
      } else {
        btnEnviar.disabled = false;
        btnEnviar.innerText = "Enviar";
        status.innerHTML = "Seu orçamento foi enviado com sucesso!";
        form.reset();
        status.classList.add("form-success");
        setTimeout(() => {
          status.innerHTML = "";
        }, 4000);
      }
    })
    .catch((error) => {
      status.innerHTML = "O orçamento não foi enviado !";
      status.classList.add("form-error");
      console.error(error);
      btnEnviar.disabled = false;
      btnEnviar.innerText = "Enviar";
    });
}

form.addEventListener("submit", enviarForm);
