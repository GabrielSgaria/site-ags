

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Formspree

let form = document.getElementById('form-orc');
const obgName = document.getElementById('obg-name');
const obgEmail = document.getElementById('obg-email')
const obgTelefone = document.getElementById('obg-telefone')
const obgMensagem = document.getElementById('obg-mensagem')


function enviarForm(e) {
  e.preventDefault();

  let status = document.querySelector('.my-form-status');
  let data = new FormData(e.target);

  const name = data.get("name");
  const email = data.get("email");
  const telefone = data.get("telefone");
  const mensagem = data.get("mensagem");

  let erro = false

  obgName.innerHTML = ""
  obgEmail.innerHTML = ""
  obgTelefone.innerHTML = ""
  obgMensagem.innerHTML = ""

  if (name === '') {
    obgName.innerHTML = "Campo obrigatorio! "

    erro = true
  }
  if (email === '') {
    obgEmail.innerHTML = "Campo obrigatorio!"
    erro = true
  }
  if (telefone === '') {
    obgTelefone.innerHTML = "Campo obrigatorio!"
    erro = true
  }
  if (mensagem === '') {
    obgMensagem.innerHTML = "Campo obrigatorio!"
    erro = true
  }
  if (erro) return

  erro = false
  obgName.innerHTML = ""
  obgEmail.innerHTML = ""
  obgTelefone.innerHTML = ""
  obgMensagem.innerHTML = ""

  fetch("https://formspree.io/f/xaygvrde", {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    body: data
  }).then((response) => {
    if (Object.hasOwn(data, 'errors')) {
      status.innerHTML = "O orçamento não foi enviado !"
      status.classList.add("form-error")
      console.error(data["errors"].map(error => error["message"]).join(", "));
    } else {
      status.innerHTML = "Seu orçamento foi enviado com sucesso!"
      form.reset();
      status.classList.add("form-success");
      setTimeout(() => {
        status.innerHTML = ""
      }, 4000)
    }
  }).catch((error) => {
    status.innerHTML = "O orçamento não foi enviado !"
    status.classList.add("form-error")
    console.error(error);
  })
}

form.addEventListener("submit", enviarForm);