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
  nif: /[0-9]{8}[A-Z]|[X-Z][0-9]{7}[A-Z]/
};
const placeholder = {
  nif: 'Introduzca su NIF sin espacios en blanco ni guiones',
  dob: 'Introduzca fecha en el siguiente formato DD / MM / AAA',

};

// Main functions
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
});

// NIF related functions
function displayErrorTooltip(errorSpan) {
  errorSpan.className += ' enable';
}

function checkNIF() {
  if (nif.input.value == '' || nif.input.value == placeholder.nif) {
    return displayErrorTooltip(nif.input.nextElementSibling);
  }
  nif.input.value = nif.input.value.toUpperCase();
  return (regex.nif.test(nif.input.value)) ?
    alert('nif.input/NIE correcto') :
    (nif.input.value = '', displayErrorTooltip(nif.input.nextElementSibling.nextElementSibling));
}

nif.input.addEventListener('focus', function () {
  this.value = '';
});

nif.input.addEventListener('blur', function () {
  return (this.value == '') ? this.value = placeholder.nif : 0;
});
















// nif.addEventListener('blur', () => {
//   nif.value = nif.value.toUpperCase();
//   if (nif.value.length < 8 && nif.value !== '') {
//     nif.value = nif.value.padStart(8, '0');
//   }
//   return (regex.test(nif.value)) ? display.textContent = 'nif/NIE correcto' : display.textContent = 'nif/NIE incorrecto'
// });

// input.addEventListener('focus', () => {
//   input.value = '';
// });

// input.addEventListener('blur', () => {
//   input.value = placeholder;
// });