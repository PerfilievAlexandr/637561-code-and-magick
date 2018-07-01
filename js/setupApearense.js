'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var textLogin = document.querySelector('.setup-user-name');
  var canClose = true;
  var setup = document.querySelector('.setup');


  var openPopup = function () {
    setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscClose);
  };

  var closePopup = function () {
    if (!canClose) {
      return;
    }

    setup.classList.add('hidden');
    setup.removeAttribute('style');

    document.removeEventListener('keydown', onPopupEscClose);
  };


  textLogin.addEventListener('focus', function () {
    canClose = false;
  });

  textLogin.addEventListener('blur', function () {
    canClose = true;
  });

  var onPopupEscClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };


  setupOpen.addEventListener('click', openPopup);


  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

})();
