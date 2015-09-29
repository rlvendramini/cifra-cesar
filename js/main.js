function exibeRange() {
  var input = document.getElementById('interval');
  var valor = parseInt(input.value, 10);
  document.getElementById('label_in').innerHTML=valor;
}

function comparar(x,y) {
  var caractere = new Array('-', '_', ',', '.', ';', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '~', '^', '\\', '|', '´', '`', '§', 'ª', 'º');
  var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  alfabeto.sort();
  if(x == 'é' || x == 'ê')
    x = 'e';
  else if(x == 'á' || x == 'à' || x == 'â')
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

    for(var i = 0; i < limite; i++) {
      for(var j=0; j<caractere.length; j++) {
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