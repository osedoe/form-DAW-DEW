// ==== Variable declaration ==== //
const form = document.querySelector('form');
const reset = document.querySelector('#reset');

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

const gender = {
  container: document.querySelector('.gender-container'),
  imgContainer: document.querySelector('.img-container'),
  male: document.getElementById('male'),
  female: document.getElementById('female'),
  maleImg: document.getElementById('male-img'),
  femaleImg: document.getElementById('female-img')
};

const regex = {
  nif: /[0-9]{8}[A-Za-z]|[X-Zx-z][0-9]{7}[A-Za-z]/,
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

  if (checkNIF() && checkDOB() && checkPassword()) {
    alert('Todo guay'); 
  }
  return event.preventDefault();
});

// NIF related functions
function checkNIF() {
  const error1 = nif.input.nextElementSibling;
  const error2 = nif.input.nextElementSibling.nextElementSibling;

  if (nif.input.value === '' || nif.input.value === placeholder.nif) {
    nif.container.style.border = '2px solid tomato';
    displayErrorTooltip(error1);
  }
  else if (!regex.nif.test(nif.input.value)) {
    nif.input.value = '';
    nif.container.style.border = '2px solid tomato';
    displayErrorTooltip(error2);
  }
  return true;
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
  const error1 = dob.input.nextElementSibling;
  const error2 = dob.input.nextElementSibling.nextElementSibling;
  if (dob.input.value == '' || dob.input.value == placeholder.dob) {
    dob.container.style.border = '2px solid tomato';
    displayErrorTooltip(error1);
  }
  else if (!regex.dob.test(dob.input.value)) {
    dob.input.value = '';
    dob.container.style.border = '2px solid tomato';
    displayErrorTooltip(error2);
  }
  return true;
}

dob.input.addEventListener('focus', function () {
  this.value = '';
});

dob.input.addEventListener('blur', function () {
  if (this.value == '') this.value = placeholder.dob;
});

//
// Password
function checkPassword() {
  const error1 = password.input.nextElementSibling;
  const error2 = password.input.nextElementSibling.nextElementSibling;
  if (password.input.value == '') {
    password.container.style.border = '2px solid tomato';
    displayErrorTooltip(error1);
    return false;
  }
  if (password.input.value.length < 6 || password.input.value !== '012345') {
    password.container.input.style.border = '2px solid tomato';
    displayErrorTooltip(error2);
    return false;
  }
  return;
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
// ==== Image ==== //
gender.container.addEventListener('click', event => {
  if (event.target.value === 'male') {
    gender.femaleImg.style.display = 'none';
    gender.maleImg.style.display = 'block';
  } else if (event.target.value === 'female') {
    gender.maleImg.style.display = 'none';
    gender.femaleImg.style.display = 'block';
  }
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