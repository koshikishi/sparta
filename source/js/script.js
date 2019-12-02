'use strict';

// Оживление всплывающего окна формы обратного звонка
if (!document.querySelector('.page--inner')) {
  var modal = document.querySelector('.modal');
  var modalOpenButtons = document.querySelectorAll('[href="contacts-form.html"]');
  var modalCloseButton = modal.querySelector('.modal__close');
  var overlay = document.querySelector('.overlay');

  // Появление всплывающего окна
  var addModalOpenClickHandler = function (btn) {
    btn.addEventListener('click', function (evt) {
      evt.preventDefault();
      modalOpen();
    });
  };

  for (var i = 0; i < modalOpenButtons.length; i++) {
    addModalOpenClickHandler(modalOpenButtons[i]);
  }

  // Закрытие всплывающего окна
  modalCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modalClose();
  });

  // Закрытие всплывающего окна клавишей ESC
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      // Проверка, открыто ли всплывающее окно
      if (modal.classList.contains('modal--shown')) {
        modalClose();
      }
    }
  });

  // Закрытие всплывающего окна по клику вне окна
  overlay.addEventListener('click', function () {
    modalClose();
  });
}

// Оживление полей ввода формы
var inputs = document.querySelectorAll('.contacts-form__field input');

var addInputBlurHandler = function (input) {
  input.addEventListener('blur', function () {
    if (input.value === '') {
      inputRequiredOn(input);
    } else if (input.parentElement.classList.contains('contacts-form__field--required')) {
      inputRequiredOff(input);
    }
  });
};

for (var j = 0; j < inputs.length; j++) {
  addInputBlurHandler(inputs[j]);
}

// Проверка полей ввода формы на заполнение перед отправкой
var contactForms = document.querySelectorAll('.contacts-form');

for (var k = 0; k < contactForms.length; k++) {
  formInputCheck(contactForms[k]);
}

// Появление всплывающего окна
function modalOpen() {
  modal.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
  document.getElementById('name_modal').focus();
}

// Закрытие всплывающего окна
function modalClose() {
  var modalInputs = modal.querySelectorAll('.contacts-form__field input');

  modal.classList.remove('modal--shown');
  overlay.classList.remove('overlay--shown');

  for (var l = 0; l < modalInputs.length; l++) {
    if (modalInputs[l].parentElement.classList.contains('contacts-form__field--required')) {
      inputRequiredOff(modalInputs[l]);
    }
  }
}

// Вывод требования заполнить поле
function inputRequiredOn(input) {
  input.parentElement.classList.add('contacts-form__field--required');
}

// Скрытие требования заполнить поле
function inputRequiredOff(input) {
  input.parentElement.classList.remove('contacts-form__field--required');
}

// Проверка полей ввода на заполнение
function formInputCheck(form) {
  var formSubmit = form.querySelector('.contacts-form__button');
  var formInputs = form.querySelectorAll('.contacts-form__field input');

  formSubmit.addEventListener('click', function (evt) {
    for (var m = formInputs.length - 1; m >= 0; m--) {
      if (formInputs[m].value === '') {
        evt.preventDefault();
        inputRequiredOn(formInputs[m]);
        formInputs[m].focus();
      }
    }
  });
}
