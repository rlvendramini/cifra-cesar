function toggleMenu() {
  var menu = document.querySelector("#nav-menu");
  menu.classList.toggle("show");
}

function exibeRange() {
  var input = document.getElementById('interval');
  var valor = parseInt(input.value, 10);
  document.getElementById('label_in').innerHTML=valor;
}

function comparar(x,y) {
  var algarismos = /\d/;
  var nonAlgarismos = /\D/;
  var num = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var caractere = new Array('-', '_', ',', '.', ';', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '~', '^', '\\', '|', '´', '`', '§', 'ª', 'º');
  var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  alfabeto.sort();
  if(algarismos.test(x))
  {
    //return parseInt(x)+parseInt(y);
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

  else if(nonAlgarismos.test(x))
  {
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
    
    var limite = alfabeto.length;
    var indice = alfabeto.indexOf(x.toLowerCase());
    var diferenca = limite-indice;

    for(var i = 0; i < limite; i++)
    {
      for(var j=0; j<caractere.length; j++)
      {
        if(x==caractere[j])
          return ' ';
      }
      
      if(x === '' || x == ' ')
        return x;
      else if(diferenca<=y)
        return alfabeto[y-diferenca];
      else
        return alfabeto[indice + y];
    }
  }
}


function encriptar() {
    var frase = document.getElementById('word').value;
    var intervalo = parseInt(document.getElementById('interval').value, 10);

    var fraseSplitted = frase.split("");
    var novaFrase = new Array(fraseSplitted.length);

    for(i = 0; i < fraseSplitted.length; i++) {
      novaFrase[i] = comparar(fraseSplitted[i], intervalo);
    }

    var resultado = novaFrase.join("");
    document.getElementById("cript").innerHTML = resultado;
}

function decomparar(x,y)
{
  var algarismos = /\d/;
  var nonAlgarismos = /\D/;
  var num = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  num.reverse();
  alfabeto.sort();
  alfabeto.reverse();

  var limite = alfabeto.length;
  var indice = alfabeto.indexOf(x.toLowerCase());
  var diferenca = limite-indice;
  
  if(algarismos.test(x))
  {
    //return parseInt(x)+parseInt(y);
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

