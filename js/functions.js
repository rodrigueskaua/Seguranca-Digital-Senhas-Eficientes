$('.navbar-nav a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var id = $(this).attr('href'),
  targetOffset = $(id).offset().top;

  $('html, body').animate({
    scrollTop: targetOffset - 100

  }, 150);
})


document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1500, // Duração da animação em milissegundos
    once: true // A animação ocorre apenas uma vez
  });
});

 function gerarSenha(length, incluirPersonalizado) {
  var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  var senha = "";

  for (var i = 0; i < length; i++) {
    senha += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  if (incluirPersonalizado) {
    incluirPersonalizado += senha;
    senha = incluirPersonalizado;
  }
    
  return senha;
}

document.getElementById("btnGerarSenha").addEventListener("click", function() {
  var senhaPersonalizada = document.getElementById("senhaPersonalizada").value;
  var senhaGerada = gerarSenha(8, senhaPersonalizada);
  var alertElement = document.createElement("div");
  
  alertElement.className = "alert text-start text-dark alert-light alert-dismissible fade show";
  alertElement.innerHTML = `
    ${senhaGerada} 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  document.getElementById("senhagerada").appendChild(alertElement);
  document.getElementById("senhaPersonalizada").value = '';
});
  