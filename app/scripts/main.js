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
  var INPUT_TYPE_RANGE = parseInt(document.querySelector('#interval').value, 10);
  document.querySelector('#label_in').innerHTML = INPUT_TYPE_RANGE;
};

SHOW_RANGE_VALUE();



/*
 * Algorithm Logics & JS Implementation : Renan Luiz Vendramini
 * JS Design Pattern                    : Isac fadoni
 *
 * Receiving a character of encript function and filtering to know which character was typed.
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

  if (DIGITS.text(x)) {
    
    LIMIT = NUM.length;
    INDEX = NUM.indexOf(parseInt(x, 10));
    DIFFERENCE = LIMIT - INDEX;
    INTERVAL = null; // If get error, remove this line

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

    LIMIT = ALPHABET.length;
    INDEX = ALPHABET.indexOf(x.toLowerCase());
    DIFFERENCE = LIMIT - INDEX;

    if (x === 'é' || x === 'ê') {
      x = 'e';
    }
    else if(x === 'á' || x === 'à' || x === 'â' || x === 'ã') {
      x = 'a';
    }
    else if(x === 'í') {
      x = 'i';
    }
    else if(x === 'ó' || x === 'ô') {
      x = 'o';
    }
    else if(x === 'ú') {
      x = 'u';
    }
    else if(x === 'ç') {
      x = 'c';
    }

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
 * Responsible for catch a word or letter, then split it and call COMPARE_CHAR function to filter;
 */
var ENCRIPT_STRING = function() {
  var PHRASE = document.getElementById('word').value;
  var INTERVAL = parseInt(document.getElementById('interval').value, 10);

  var PHRASE_SPLITTED = PHRASE.split('');
  var NEW_PHRASE = new Array(PHRASE_SPLITTED.length);

  for(var i = 0; i < PHRASE_SPLITTED.length; i++) {
    NEW_PHRASE[i] = COMPARE_CHAR(PHRASE_SPLITTED[i], INTERVAL);
  }

  var CRYPTO_RESULT = NEW_PHRASE.join('');
  document.getElementById('cripted').innerHTML = CRYPTO_RESULT;

};

ENCRIPT_STRING(false);