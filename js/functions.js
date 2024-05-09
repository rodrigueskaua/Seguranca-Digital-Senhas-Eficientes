$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  var id = $(this).attr('href'),
  targetOffset = $(id).offset().top;

  $('html, body').animate({
    scrollTop: targetOffset - 300

  }, 150);
})


document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 1500, // Duração da animação em milissegundos
    once: true // A animação ocorre apenas uma vez
  });
});

function gerarSenha(length, incluirPersonalizado) {
  var letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  var letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numeros = "0123456789";
  var caracteresEspeciais = "!@#$%^&*()_+";

  // Senha inicialmente vazia
  var senha = "";

  // Adicionar caracteres personalizados no início da senha
  senha += incluirPersonalizado || "";

  // Garantir que a senha tenha pelo menos 2 letras maiúsculas, 2 letras minúsculas, 2 números e 2 caracteres especiais
  senha += getRandomCharacter(letrasMinusculas); // Letra minúscula
  senha += getRandomCharacter(letrasMinusculas);
  senha += getRandomCharacter(letrasMaiusculas); // Letra maiúscula
  senha += getRandomCharacter(letrasMaiusculas);
  senha += getRandomCharacter(numeros); // Número
  senha += getRandomCharacter(numeros);
  senha += getRandomCharacter(caracteresEspeciais); // Caractere especial
  senha += getRandomCharacter(caracteresEspeciais);

  // Completar o restante da senha com caracteres aleatórios
  var charset = letrasMinusculas + letrasMaiusculas + numeros + caracteresEspeciais;
  for (var i = senha.length; i < length; i++) {
    senha += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Embaralhar a senha
  senha = shuffleString(senha);
  
  return senha;
}

// Função auxiliar para obter um caractere aleatório de uma string
function getRandomCharacter(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

// Função auxiliar para embaralhar uma string
function shuffleString(str) {
  var array = str.split("");
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.join("");
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
  
document.getElementById("senhaDigitada").addEventListener("input", function() {
  var senha = this.value;
  var forcaSenha = document.getElementById("forcaSenha");

  // Verificar comprimento mínimo
  var comprimentoMinimo = senha.length >= 8;
  var possuiCaracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
  var possuiNumeros = /[0-9]/.test(senha);
  var possuiLetrasMaiusculas = /[A-Z]/.test(senha);
  
  if (comprimentoMinimo && possuiCaracteresEspeciais && possuiNumeros && possuiLetrasMaiusculas) {
    forcaSenha.innerHTML = "<strong>Senha segura!</strong>";
    forcaSenha.classList.remove("text-danger");
    forcaSenha.classList.add("text-success");
  } else {
    forcaSenha.innerHTML = "<strong>Senha não segura. É necessário:</strong><br>";
    forcaSenha.classList.remove("text-success");
    forcaSenha.classList.add("text-danger");
    if (!comprimentoMinimo) {
      forcaSenha.innerHTML += "- Ter pelo menos 8 caracteres<br>";
    }
    if (!possuiCaracteresEspeciais) {
      forcaSenha.innerHTML += "- Incluir caracteres especiais (!@#$%^&*(),.?\":{}|<>))<br>";
    }
    if (!possuiNumeros) {
      forcaSenha.innerHTML += "- Incluir números<br>";
    }
    if (!possuiLetrasMaiusculas) {
      forcaSenha.innerHTML += "- Incluir letras maiúsculas<br>";
    }
  }
});
