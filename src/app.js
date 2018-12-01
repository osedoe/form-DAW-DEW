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
  clearPass: document.querySelector('.password-input a'),
  buttonsContainer: document.querySelector('.btn-pass-container'),
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
  generatePasswordBtns();
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
  checkPassword();
});

// NIF related functions
function checkNIF() {
  if (nif.input.value == '' || nif.input.value == placeholder.nif) {
    nif.container.style.border = '2px solid tomato';
    return displayErrorTooltip(nif.input.nextElementSibling);
  }
  nif.input.value = nif.input.value.toUpperCase();
  // Ternary operator that 
  return (!regex.nif.test(nif.input.value)) ?
    (nif.input.value = '',
    nif.container.style.border = '2px solid tomato',
    displayErrorTooltip(nif.input.nextElementSibling.nextElementSibling)) :
    1;
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
    dob.container.style.border = '2px solid tomato';
    return displayErrorTooltip(dob.input.nextElementSibling);
  }
  return (!regex.dob.test(dob.input.value)) ?
    (dob.input.value = '',
    dob.container.style.border = '2px solid tomato',
    displayErrorTooltip(dob.input.nextElementSibling.nextElementSibling)) : 1;
}

dob.input.addEventListener('focus', function () {
  this.value = '';
});

dob.input.addEventListener('blur', function () {
  return (this.value == '') ? this.value = placeholder.dob : 0;
});

//
// Password
function checkPassword() {
  if (password.input.value == '') {
    password.container.style.border = '2px solid tomato';
    return displayErrorTooltip(password.input.nextElementSibling);
  } else if (password.input.value.length < 6) {
    password.container.input.style.border = '2px solid tomato';
    return displayErrorTooltip(password.nextElementSibling.nextElementSibling);
  }
}
password.buttonsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.tagName === 'BUTTON' && password.input.value.length < 6) {
    password.input.value += event.target.value;
  }
});

password.clearPass.addEventListener('click', event => {
  event.preventDefault();
  password.input.value = '';
});

//
// ==== Utils ==== //
function displayErrorTooltip(errorSpan) {
  errorSpan.className += ' enable';
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function generateBtnElement(content, parent) {
  const btn = document.createElement('button');
  const btnText = document.createTextNode(content);
  btn.value = content;
  btn.appendChild(btnText);
  parent.appendChild(btn);
}

function generatePasswordBtns() {
  let btnArray = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  btnArray.forEach(number => {
    generateBtnElement(number, password.buttonsContainer);
  });
}