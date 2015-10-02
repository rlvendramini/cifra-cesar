//função que exibe o menu
function toggleMenu() {
  var menu = document.querySelector("#nav-menu");
  menu.classList.toggle("show");
}

//essa função é responsável por exibir o valor selecionado no input range em tempo real, para que o usuário saiba qual valor selecionou
function exibeRange() {
  var input = document.getElementById('interval');
  var valor = parseInt(input.value, 10);
  document.getElementById('label_in').innerHTML=valor;
}

/* Funções de encriptação */
//nessa função, recebemos um caractere da função de encriptação e fazemos uma análise para saber o que foi digitado
function comparar(x,y) {
  var algarismos = /\d/; //expressão regular que busca algarismos
  var nonAlgarismos = /\D/; //expressão regular que busca tudo menos algarismos
  var num = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //vetor de algarismos
  //vetor de caracteres especiais mapeados
  var caractere = new Array('-', '_', ',', '.', ';', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '~', '^', '\\', '|', '´', '`', '§', 'ª', 'º');
  //vetor que contém as letras do alfabeto
  var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  //função que garante ordenação por ordem alfabética do vetor
  alfabeto.sort();
  if(algarismos.test(x))//fazemos um teste para saber se o caractere é algarismo
  {
    //se ele for, então precisamos tratá-lo separadamente
    var limite = num.length;//limite é o tamanho do vetor de algarismos, no caso, são 10 algarismos básicos de 0 a 9
    var indice = num.indexOf(parseInt(x)); //em índice, definimos em qual índice, dentro do vetor de algarismos, se encontra o algarismo digitado
    var diferenca = limite-indice;//a diferennça nos diz qual a distância do índice para o fim do vetor
    if(y>=10)//como recebemos um intervalo que vai de 1 a 26, por conta das letras do alfabeto, e o vetor de algarismos possui apenas 10 posições
      //então precisamos definir um intervalo menor que 10. no caso, fazemos uma divisão sem resto, nem casa decimal, para travar um índice.
      var intervalo = parseInt(y/10);//os índices travados possíveis são: 1 para intervalos de 10 à 19; 2 para intervalos de 20 à 26;
    else
      var intervalo = y;//caso o intervalo seja menor do que 10, então ele está dentro do limite do vetor algarismo, podendo ser representado originalmente
    //então verificamos se o intervalo é menor que a diferença, para saber se ele chegará ao fim do vetor, ou se precisará voltar ao início
    if(intervalo>=diferenca)
      return num[intervalo-diferenca];//se o intervalo for maior ou iigual à diferença, então o índice do vetor apresentado será o intervalo - a diferença
    else
      return num[indice + intervalo];//se não, podemos somar o intervalo ao índice descoberto do caractere digitado, para obter o novo algarismo
  }
  else if(nonAlgarismos.test(x))//caso o caractere não seja um algarismo, então ele é um caractere e precisará de outro tratamento
  {
    //tratamos os acentos individualmente, para que não haja problemas nas trocas. eles serão substituidos pelas mesmas letras digitadas, sem acentuação
    if(x == 'é' || x == 'ê')
    x = 'e';
    else if(x == 'á' || x == 'à' || x == 'â' || x == 'ã' )
      x = 'a';
    else if(x == 'í')
      x = 'i';
    else if(x == 'ó' || x == 'ô')
      x = 'o';
    else if(x == 'ú')
      x = 'u';
    else if(x == 'ç')
      x = 'c';
    
    var limite = alfabeto.length;//aqui definimos o limite do vetor do alfabeto, no caso, 26 letras
    var indice = alfabeto.indexOf(x.toLowerCase());//encontramos o índice em que se encontra o caractere digitado pelo usuário
    var diferenca = limite-indice;//e aí verificamos a distância desse índice para o final do vetor

    for(var i = 0; i < limite; i++)
    {
      for(var j=0; j<caractere.length; j++)
      {
        if(x==caractere[j])//verificamos se o caractere não é um dos caracteres especiais mapeados
          return ' ';//nesse caso, caso ele seja, retornamos apenas um espaço em branco para não comprometermos a mensagem
      }
      
      if(x === '' || x == ' ')//se o caractere digitado for um vazio, ou espaço, retornamos ele mesmo
        return x;
      else if(diferenca<=y)//se a diferença for menor que o intervalo, então não há espaço para ele correr até o fim do vetor
        return alfabeto[y-diferenca];//nesse caso, subtraímos a diferença do intervalo, e esse será o índice retornado
      else
        return alfabeto[indice + y];//se não, então há espaço para o intervalo percorrer o vetor, logo, somamos ele ao índice
    }
  }
}

//essa função é responsável por capturar a palavra, ou frase, digitada, desmembra todos os seus caracteres digitados num vetor e chama 
// a função de comparação para saber se é um algarismo, ou letra, e então recebe o caractere novo já cifrado, armazena num novo vetor
// e junta tudo!
function encriptar() {
    var frase = document.getElementById('word').value; //captura frase
    var intervalo = parseInt(document.getElementById('interval').value, 10); //captura o intervalo

    var fraseSplitted = frase.split(""); //divide todos os caracteres da frase em um vetor
    var novaFrase = new Array(fraseSplitted.length);//cria um vetor que conterá a nova frase, com o mesmo tamanho do vetor da frase original

    for(i = 0; i < fraseSplitted.length; i++) {
      novaFrase[i] = comparar(fraseSplitted[i], intervalo);
      //percorre todo o vetor, chamando a função de comparação para verificar e encriptar caractere por caractere
    }

    var resultado = novaFrase.join("");//junta os caracteres já encriptados numa nova palavra ou frase
    document.getElementById("cript").innerHTML = resultado; //exibe o resultado
}

/* Funções de decriptação */

//Essas funções funcionam da mesma forma que as de encriptação, mas foram invertidas em alguns pontos para fazer o caminho inverso
function decomparar(x,y)
{
  var algarismos = /\d/;
  var nonAlgarismos = /\D/;
  var num = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  num.reverse();//vetor algarismos foi invertido
  alfabeto.sort();
  alfabeto.reverse();//vetor alfabeto foi invertido
  //com esses dois vetores invertidos, o funcionamento das funções é o mesmo, no entanto, o caminho percorrido será inverso ao de encriptação

  var limite = alfabeto.length;
  var indice = alfabeto.indexOf(x.toLowerCase());
  var diferenca = limite-indice;
  
  if(algarismos.test(x))
  {
    var limite = num.length;
    var indice = num.indexOf(parseInt(x));
    var diferenca = limite-indice;
    if(y>=10)
      var intervalo = parseInt(y/10);
    else
      var intervalo = y;
    if(intervalo>=diferenca)
      return num[intervalo-diferenca];
    else
      return num[indice + intervalo];
  }
  for(var i = 0; i < limite; i++)
  {
    if(x == '' || x == ' ') 
      return x;
    else if(diferenca<=y)
      return alfabeto[y-diferenca];
    else
      return alfabeto[indice + y];
  }
}

function decriptar()
{
    var frase = document.getElementById('word').value;
    var intervalo = parseInt(document.getElementById('interval').value);

    var fraseSplitted = frase.split("");
    var novaFrase = new Array(fraseSplitted.length);

    for(i = 0; i < fraseSplitted.length; i++)
    {
      novaFrase[i] = decomparar(fraseSplitted[i], intervalo);
    }
    var resultado = novaFrase.join("");

    document.getElementById("cript").innerHTML = resultado;
}



/* Interações da UI */

// Esconde o menu e mostra a explicação da criptografia
var mainmenu = document.querySelectorAll('.main-menu')[0];
var expanel = document.querySelector('#explanation');
var howitbutton = document.querySelector('#howit');

howitbutton.onclick = function hideMenu(e) {
  e.preventDefault();
  mainmenu.classList.add('hide');
  expanel.classList.add('show');
};

// Último Slide
var firstslide = document.querySelector("#first");
var lastslide = document.querySelector("#last");
var slidebtn = document.querySelector("#control-r");

slidebtn.onclick = function changeLocation() {
  if (firstslide.style.visibility == "hidden" && lastslide.style.visibility == "hidden") {
    window.location.href = "encript.html";
  }
};


// Copiar resultado para o clipboard

function showFAB() {
  var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
  var copyTextarea = document.querySelector('.js-copytextarea');
  var inputword = document.querySelector('#word').value;

  if (inputword !== '') {
    copyTextareaBtn.classList.remove("hide");
  } else {
    copyTextareaBtn.classList.add("hide");
  }

  copyTextareaBtn.addEventListener('click', function(event) {
    event.preventDefault();
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  });
}

