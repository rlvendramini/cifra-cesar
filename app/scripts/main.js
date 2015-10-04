// Script for UI Interaction and Behavior


'use strict';

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

EXIT_BUTTON.addEventListener('click', EXIT_DIALOG, false);
INFO_BUTTON.addEventListener('click', SHOW_DIALOG, false);