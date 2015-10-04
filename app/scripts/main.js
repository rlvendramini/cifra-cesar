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
 * so the user can know how much the input is.
 */
var SHOW_RANGE_VALUE = function() {
  var INPUT_TYPE_RANGE = parseInt(document.querySelector('#interval').value, 10);
  document.querySelector('#label_in').innerHTML = INPUT_TYPE_RANGE;
};

SHOW_RANGE_VALUE();



