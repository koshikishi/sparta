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

// Появление всплывающего окна
function modalOpen() {
  modal.classList.add('modal--shown');
  overlay.classList.add('overlay--shown');
  document.getElementById('name_modal').focus();
}

// Закрытие всплывающего окна
function modalClose() {
  modal.classList.remove('modal--shown');
  overlay.classList.remove('overlay--shown');
}
