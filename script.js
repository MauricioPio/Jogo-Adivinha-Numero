var numeroAleatorio = Math.floor(Math.random() * 100) + 1;

var palpites = document.querySelector('.palpites');
var ultimoResultado = document.querySelector('.ultimoResultado');
var baixoOuAlto = document.querySelector('.baixoOuAlto');

var envioPalpite = document.querySelector('.envioPalpite');
var campoPalpite = document.querySelector('.campoPalpite');
var container = document.querySelector('.container');

var contagemPalpites = 1;
var botaoReinicio;

function conferirPalpite() {
  var palpiteUsuario = Number(campoPalpite.value);
  if (contagemPalpites === 1) {
    palpites.textContent = 'Palpites anteriores: ';
  }
  palpites.textContent += palpiteUsuario + ' ';
  palpites.classList.add('palpites_active')

  if (palpiteUsuario === numeroAleatorio) {
    ultimoResultado.textContent = 'Parabéns! Você acertou! 😄';
    ultimoResultado.style.backgroundColor = 'green';
    baixoOuAlto.textContent = '';
    configFimDeJogo();
  } else if (contagemPalpites === 10) {
    ultimoResultado.textContent = 'FIM DE JOGO!!! O número era: ' + numeroAleatorio + ' 😭';
    baixoOuAlto.textContent = '';
    configFimDeJogo();
  } else {
    ultimoResultado.textContent = 'Errado!  🫤';
    ultimoResultado.classList.add('ultimoResultado_active');
    if (palpiteUsuario < numeroAleatorio) {
      baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
    } else if (palpiteUsuario > numeroAleatorio) {
      baixoOuAlto.textContent = 'Seu palpite está muito alto!';
    }
  }

  contagemPalpites++;
  campoPalpite.value = '';
  campoPalpite.focus();
}

envioPalpite.addEventListener('click', conferirPalpite);

function configFimDeJogo() {
  campoPalpite.disabled = true;
  envioPalpite.disabled = true;
  botaoReinicio = document.createElement('button');
  botaoReinicio.classList.add('botao_reinicio');
  botaoReinicio.textContent = 'Iniciar novo jogo';
  container.appendChild(botaoReinicio);
  botaoReinicio.addEventListener('click', reiniciarJogo);
}

function reiniciarJogo() {
  contagemPalpites = 1;

  var reiniciarParas = document.querySelectorAll('.resultadoParas p');
  for (var i = 0 ; i < reiniciarParas.length ; i++) {
    reiniciarParas[i].textContent = '';
  }

  botaoReinicio.parentNode.removeChild(botaoReinicio);

  campoPalpite.disabled = false;
  envioPalpite.disabled = false;
  campoPalpite.value = '';
  campoPalpite.focus();

  palpites.textContent = '';  
  ultimoResultado.textContent = '';
  ultimoResultado.classList.remove('ultimoResultado_active');
  palpites.classList.remove('palpites_active');
  ultimoResultado.style.backgroundColor = 'red';

  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
}
