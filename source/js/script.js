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

// Добавление скролла перетаскиванием мышью
if (!document.querySelector('.page--inner')) {
  var scrollViewport = {
    knowledge: document.querySelector('.knowledge__extra-wrapper'),
    gallery: document.querySelector('.gallery__inner'),
    map: document.querySelector('.map__inner'),
  };

  if (window.matchMedia('(min-width: 750px) and (max-width: 1139px)').matches) {
    addDragScroll(scrollViewport.knowledge);
  }

  if (window.matchMedia('(max-width: 1919px)').matches) {
    addDragScroll(scrollViewport.gallery);
    addDragScroll(scrollViewport.map);
  }

  window.addEventListener('resize', function () {
    if (window.matchMedia('(min-width: 750px) and (max-width: 1139px)').matches) {
      addDragScroll(scrollViewport.knowledge);
    } else {
      removeDragScroll(scrollViewport.knowledge);
    }

    if (window.matchMedia('(max-width: 1919px)').matches) {
      addDragScroll(scrollViewport.gallery);
      addDragScroll(scrollViewport.map);
    } else {
      removeDragScroll(scrollViewport.gallery);
      removeDragScroll(scrollViewport.map);
    }
  });
}

// Запуск видео и отображение элементов управления по клику
var video = document.querySelector('.testimonials__video video');

if (video) {
  video.controls = false;

  video.addEventListener('click', function (evt) {
    evt.preventDefault();
    video.play();
    video.controls = true;
  });
}

// Отображение полного отзыва
if (!document.querySelector('.page--inner')) {
  var testimonialLinks = document.querySelectorAll('.testimonials__item-link');

  var addTestimonialLinksClickHandler = function (link) {
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      link.parentElement.classList.add('no-js');
    });
  };

  for (var n = 0; n < testimonialLinks.length; n++) {
    addTestimonialLinksClickHandler(testimonialLinks[n]);
  }
}

// Оживление слайдера отзывов
if (!document.querySelector('.page--inner')) {
  var testimonialSlider = new Flickity('.testimonials__list', {
    contain: true,
    prevNextButtons: false,
    pageDots: false
  });

  // Добавление кастомных элементов управления
  var testimonialDotsGroup = document.querySelector('.testimonials__dots');
  var testimonialDots = window.fizzyUIUtils.makeArray(testimonialDotsGroup.children);

  testimonialSlider.on('select', function () {
    var previousSelectedDot = document.querySelector('.testimonials__dot--active');
    var selectedDot = testimonialDotsGroup.children[testimonialSlider.selectedIndex];

    previousSelectedDot.classList.remove('testimonials__dot--active');
    selectedDot.classList.add('testimonials__dot--active');
  });

  testimonialDotsGroup.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (!matchesSelector(evt.target, '.testimonials__dot')) {
      return;
    }

    var index = testimonialDots.indexOf(evt.target);
    testimonialSlider.select(index);
  });

  // Добавление кастомных стрелок
  var testimonialPrevButton = document.querySelector('.testimonials__arrow--prev');
  var testimonialNextButton = document.querySelector('.testimonials__arrow--next');

  testimonialPrevButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    testimonialSlider.previous();
  });

  testimonialNextButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    testimonialSlider.next();
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

// Добавление скролла перетаскиванием мышью
function addDragScroll(elmnt) {
  if (!elmnt.classList.contains('dragscroll')) {
    elmnt.classList.add('dragscroll');
    dragscroll.reset();
  }
}

// Удаление скролла перетаскиванием мышью
function removeDragScroll(elmnt) {
  if (elmnt.classList.contains('dragscroll')) {
    elmnt.classList.remove('dragscroll');
    dragscroll.reset();
  }
}
