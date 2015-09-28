function comparar(x,y)
{
	var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
	for(var i=0; i<alfabeto.length; i++)
	{
		if(x=="" || x==" ")
			return x;
		else
		{
			var indice = alfabeto.indexOf(x.toLowerCase());
			return alfabeto[indice+y];
		}
	}
}

function encriptar(x,y)
{
	var alfabeto = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

	var fraseSplitted = x.split("");
	var limite = x.length;

	var novaFrase = new Array(limite);

	for(i=0; i<limite; i++)
	{
		novaFrase[i] = comparar(fraseSplitted[i], y);
	}
	var result = novaFrase.join("");

	document.getElementById('cript').innerHTML="Resultado: "+result;
}

function funcao()
{
	var frase = document.getElementById('word').value;
	var intervalo = document.getElementById('interval').value;

	encriptar(frase,intervalo);
}