// ==== Variable declaration ==== //
const form = document.querySelector('form');

const nif = {
  container: document.querySelector('.nif-container'),
  input: document.querySelector('#nif')
};

const dob = {
  container: document.querySelector('.dob-container'),
  input: document.querySelector('#dob')
};

const password = {
  container: document.querySelector('.password-container'),
  input: document.querySelector('#password'),
  buttons: document.querySelectorAll('.btn-pass-container button')
};

const reset = document.querySelector('#reset');

const regex = {
  nif: /[0-9]{8}[A-Z]|[X-Z][0-9]{7}[A-Z]/,
  dob: /[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/
};
const placeholder = {
  nif: 'Introduzca su NIF sin espacios en blanco ni guiones',
  dob: 'DD/MM/AAAA',

};

//
// ==== Main functions ==== //

// Loader
window.addEventListener('load', () => {
  nif.input.value = placeholder.nif;
  dob.input.value = placeholder.dob;
});

// On reset 
reset.addEventListener('click', () => {
  window.location.reload();
});

// On Submit
form.addEventListener('submit', function (event) {
  event.preventDefault();
  checkNIF();
  checkDOB();
});

// NIF related functions
function checkNIF() {
  if (nif.input.value == '' || nif.input.value == placeholder.nif) {
    return displayErrorTooltip(nif.input.nextElementSibling);
  }
  nif.input.value = nif.input.value.toUpperCase();
  return (regex.nif.test(nif.input.value)) ?
    1 :
    (nif.input.value = '', displayErrorTooltip(nif.input.nextElementSibling.nextElementSibling));
}

nif.input.addEventListener('focus', function () {
  this.value = '';
});

nif.input.addEventListener('blur', function () {
  return (this.value == '') ? this.value = placeholder.nif : 0;
});

//
// Date of Birth (dob) related functions

function checkDOB() {
  if (dob.input.value == '' || dob.input.value == placeholder.dob) {
    return displayErrorTooltip(dob.input.nextElementSibling);
  }
  return (regex.dob.test(dob.input.value)) ?
    1 :
    (dob.input.value = '', displayErrorTooltip(dob.input.nextElementSibling.nextElementSibling));

}

dob.input.addEventListener('focus', function () {
  this.value = '';
});

dob.input.addEventListener('blur', function () {
  return (this.value == '') ? this.value = placeholder.dob : 0;
});

//
// ==== Utils ==== //
function displayErrorTooltip(errorSpan) {
  errorSpan.className += ' enable';
}