let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
   let campo = document.querySelector(tag);
   campo.innerHTML = texto;
   //colocando uma função de fala do HTMLlinha7, vai falar o texto que digitarmos e idioma e velocidade da fala
   responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
exibirTextoNaTela('h1', 'Jogo do Número Secreto');
exibirTextoNaTela('p', 'Escolha um Número entre 1 e 10');
}

exibirMensagemInicial();

//função que cria utilidade ao botão. faz acontecer alguma coisa 
function verificarChute() {
   let chute = document.querySelector('input').value;
   
   if (chute == numeroSecreto) {
      exibirTextoNaTela('h1', 'Acertou!');
      //palavra tentativa para poder simplificar o comando 
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Voce descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
      exibirTextoNaTela('p', mensagemTentativas);
      //se acertarmos o jogo o botão reiniciar fica abilitado para pode ser selecionado
      document.getElementById('reiniciar').removeAttribute('disabled');
   } else {
      if (chute > numeroSecreto) {
         exibirTextoNaTela('p', 'O número secreto é menor!');
      }  else {
         exibirTextoNaTela('p', 'O número secreto é maior!');            
      }
      tentativas++; 
      limparCampo();  
   }  
}

//função gerar número aleatório e com uma lista
function gerarNumeroAleatorio() {
   //criado uma variável para poder verificar com a lista
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); 
   //criamos uma variável para receber os números sorteados 
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
   //condição para limpar nossa lista após todos números serem sorteados
   if (quantidadeDeElementosNaLista == numeroLimite) {
      listaDeNumerosSorteados =[];
   }
   //condição para incluir números sorteados a lista
   if (listaDeNumerosSorteados.includes(numeroEscolhido)){
      return gerarNumeroAleatorio();
   }  else {
      //condição para incluir um número já sorteado a lista e trazer um número novo ao sorteio
      listaDeNumerosSorteados.push(numeroEscolhido);
      return numeroEscolhido;
   }
}

function limparCampo() {
   chute = document.querySelector('input');
   chute.value = '';
}

function reiniciarJogo() {
   numeroSecreto = gerarNumeroAleatorio();
   limparCampo();
   tentativas = 1; 
   exibirMensagemInicial();
   //deixo o botão desabilitado até que o jogo seja concluido, 'setAttribute' para adicionar um atributo 
   document.getElementById('reiniciar').setAttribute('disabled', true);
}  