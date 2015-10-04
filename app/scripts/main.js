'use strict';



// Script for UI Interaction and Behavior


/* 
 * Open/Close a dialog with some information to user.
 */
var INFO_DIALOG = document.querySelector('#modalone');
var INFO_BUTTON = document.querySelector('.material-button[href="#comofunciona"]');
var EXIT_BUTTON = document.querySelector('.material-dialog footer a[href="#fechar"]');

var SHOW_DIALOG = function() {
  INFO_DIALOG.classList.add('show');
  INFO_BUTTON.removeEventListener('click', SHOW_DIALOG, false);
};

var EXIT_DIALOG = function() {
  INFO_DIALOG.classList.remove('show');
  INFO_BUTTON.addEventListener('click', SHOW_DIALOG, false);
};

var GET_CONTROLLERS = function() {
  if (EXIT_BUTTON) {
    EXIT_BUTTON.addEventListener('click', EXIT_DIALOG, false);
  } else if (INFO_BUTTON) {
    INFO_BUTTON.addEventListener('click', SHOW_DIALOG, false);
  }
};

GET_CONTROLLERS();



/*
 * Responsible for show input range's dynamically, 
 * so the user can know which value the input is.
 */
var SHOW_RANGE_VALUE = function() {
  var INPUT_TYPE_RANGE = document.querySelector('#interval');
  var INPUT_LABEL = document.querySelector('#label_in');
  
  if (INPUT_LABEL || INPUT_TYPE_RANGE) {
    INPUT_TYPE_RANGE = parseInt(INPUT_TYPE_RANGE.value, 10);
    INPUT_LABEL.innerHTML = INPUT_TYPE_RANGE;
  }

};

SHOW_RANGE_VALUE();



/*
 * Algorithm Logics & JS Implementation : Renan Luiz Vendramini
 * JS Design Pattern                    : Isac fadoni
 *
 * Receiving a character of ENCRIPT_STRING function and filtering to know which character was typed.
 */
var COMPARE_CHAR = function(x, y) {
  var DIGITS = /\d/;
  var NON_DIGITS = /\D/;

  
  var NUM = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var SPECIAL_CHAR = new Array('-', '_', ',', '.', ';', '!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '~', '^', '\\', '|', '´', '`', '§', 'ª', 'º');
  var ALPHABET = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');

  ALPHABET.sort();
  
  var LIMIT = null;
  var INDEX = null;
  var DIFFERENCE = null;
  var INTERVAL = null;

  if (DIGITS.test(x)) {
    
    LIMIT = NUM.length;
    INDEX = NUM.indexOf(parseInt(x, 10));
    DIFFERENCE = LIMIT - INDEX;
    //INTERVAL = null;

    if (y >= 10) {
      INTERVAL = parseInt(y/10, 10);
    } else {
      INTERVAL = y;
    }
 
    if (INTERVAL >= DIFFERENCE) {
      return NUM[INTERVAL - DIFFERENCE];
    } else {
      return NUM[INDEX + INTERVAL];
    }

  } else if (NON_DIGITS.test(x)) {


    if (x === 'é' || x === 'ê') {
      x = 'e';
    }
    else if (x === 'á' || x === 'à' || x === 'â' || x === 'ã') {
      x = 'a';
    }
    else if (x === 'í') {
      x = 'i';
    }
    else if (x === 'ó' || x === 'ô') {
      x = 'o';
    }
    else if (x === 'ú') {
      x = 'u';
    }
    else if (x === 'ç') {
      x = 'c';
    }

    LIMIT = ALPHABET.length;
    INDEX = ALPHABET.indexOf(x.toLowerCase());
    DIFFERENCE = LIMIT - INDEX;

    for(var i = 0; i < LIMIT; i++) {
      for(var j = 0; j < SPECIAL_CHAR.length; j++) {
        if(x === SPECIAL_CHAR[j]) {
          return ' ';
        }
      }
      if(x === '' || x === ' ') {
        return x;
      }
      else if(DIFFERENCE <= y) {
        return ALPHABET[y - DIFFERENCE];
      }
      else {
        return ALPHABET[INDEX + y];
      }

    }

  }

};



/*
 * Responsible for catch a word or letter, then split it and call COMPARE_CHAR function to filter.
 * This function generates the crypted word that is put in '#cripted' HTML Element.
 */
var ENCRIPT_STRING = function() {
  var PHRASE = document.querySelector('#word');
  var INTERVAL = document.querySelector('#interval');

  if (PHRASE && INTERVAL) {
    PHRASE = PHRASE.value;
    INTERVAL = parseInt(INTERVAL.value, 10);

    var PHRASE_SPLITTED = PHRASE.split('');
    var NEW_PHRASE = new Array(PHRASE_SPLITTED.length);

    for(var i = 0; i < PHRASE_SPLITTED.length; i++) {
      NEW_PHRASE[i] = COMPARE_CHAR(PHRASE_SPLITTED[i], INTERVAL);
    }

    var CRYPTO_RESULT = NEW_PHRASE.join('');
    var GET_ELEMENT = document.querySelector('#cripted');

    if (GET_ELEMENT) {
      GET_ELEMENT.innerHTML = CRYPTO_RESULT;
    }

  }


};

ENCRIPT_STRING();


/*
 *
 * Receiving a CRYPTED character of DECRIPT_STRING function and filtering to know which character was typed.
 */
var DECOMPARE_CHAR = function(x, y) {
  var DIGITS = /\d/;
  var NUM = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  var ALPHABET = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  NUM.reverse();
  ALPHABET.sort();
  ALPHABET.reverse();
  

  var LIMIT = ALPHABET.length;
  var INDEX = ALPHABET.indexOf(x.toLowerCase());
  var DIFFERENCE = LIMIT - INDEX;
  var INTERVAL = null;

  if(DIGITS.test(x)) {
    LIMIT = NUM.length;
    INDEX = NUM.indexOf(parseInt(x, 10));
    DIFFERENCE = LIMIT - INDEX;

    if(y >= 10) {
      INTERVAL = parseInt(y/10, 10);
    } else {
      INTERVAL = y;
    }

    if(INTERVAL >= DIFFERENCE) {
      return NUM[INTERVAL - DIFFERENCE];
    } else {
      return NUM[INDEX + INTERVAL];
    }

  }

  for(var i = 0; i < LIMIT; i++) {
    if(x === '' || x === ' ') {
      return x;
    }
    else if(DIFFERENCE <= y) {
      return ALPHABET[y - DIFFERENCE];
    }
    else {
      return ALPHABET[INDEX + y];
    }

  }

};



/*
 * Responsible for catch a crypted word or letter, then split it and call DECOMPARE_CHAR function to filter.
 * This function generates the decrypted word that is put in '#decripted' HTML Element.
 */
var DECRIPT_STRING = function() {
  var PHRASE = document.querySelector('#word');
  var INTERVAL = document.querySelector('#interval');

  if (PHRASE && INTERVAL) {
    PHRASE = PHRASE.value;
    INTERVAL = parseInt(INTERVAL.value, 10);

    var PHRASE_SPLITTED = PHRASE.split('');
    var NEW_PHRASE = new Array(PHRASE_SPLITTED.length);

    for(var i = 0; i < PHRASE_SPLITTED.length; i++) {
      NEW_PHRASE[i] = DECOMPARE_CHAR(PHRASE_SPLITTED[i], INTERVAL);
    }

    var DECRYPTO_RESULT = NEW_PHRASE.join('');
    var GET_ELEMENT = document.querySelector('#decripted');

    if (GET_ELEMENT) {
      GET_ELEMENT.innerHTML = DECRYPTO_RESULT;
    }
    
  }

};

DECRIPT_STRING();