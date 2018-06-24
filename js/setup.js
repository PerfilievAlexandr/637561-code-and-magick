'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizards = [];
  var setupOpen = document.querySelector('.setup-open');
  window.setup = document.querySelector('.setup');
  var setupClose = window.setup.querySelector('.setup-close');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var textLogin = document.querySelector('.setup-user-name');
  var inputCoatColor = window.setup.querySelector('input[name=coat-color]');
  var inputEyesColor = window.setup.querySelector('input[name=eyes-color]');
  var canClose = true;
  var fragment = document.createDocumentFragment();

  var renderWizard = function (paramWizard) {
    var element = similarWizardTemplate.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = paramWizard.name;
    element.querySelector('.wizard-coat').style.fill = paramWizard.coatColor;
    element.querySelector('.wizard-eyes').style.fill = paramWizard.eyesColor;
    return element;
  };

  var openPopup = function () {
    window.setup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscClose);
  };

  var closePopup = function () {
    if (!canClose) {
      return;
    }

    window.setup.classList.add('hidden');
    window.setup.removeAttribute('style');

    document.removeEventListener('keydown', onPopupEscClose);
  };


  for (var i = 0; i < 4; i++) {
    wizards.push(
        {
          name: WIZARD_NAMES[window.getRandomInt(0, WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[window.getRandomInt(0, WIZARD_NAMES.length)],
          coatColor: WIZARD_COAT_COLORS[window.getRandomInt(0, WIZARD_COAT_COLORS.length)],
          eyesColor: WIZARD_EYES_COLORS[window.getRandomInt(0, WIZARD_EYES_COLORS.length)]
        }
    );
  }

  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }

  similarListElement.appendChild(fragment);

  document.querySelector('.setup-similar').classList.remove('hidden');

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

  wizardCoat.addEventListener('click', function () {
    var indexElement = WIZARD_COAT_COLORS[window.getRandomInt(0, WIZARD_COAT_COLORS.length - 1)];
    wizardCoat.style.fill = indexElement;
    inputCoatColor.value = indexElement;
  });

  wizardEyes.addEventListener('click', function () {
    var indexElement = WIZARD_EYES_COLORS[window.getRandomInt(0, WIZARD_EYES_COLORS.length - 1)];
    wizardEyes.style.fill = indexElement;
    inputEyesColor.value = indexElement;
  });

  fireball.addEventListener('click', function () {
    fireball.style.background = FIREBALL_COLORS[window.getRandomInt(0, FIREBALL_COLORS.length - 1)];
  });
})();
