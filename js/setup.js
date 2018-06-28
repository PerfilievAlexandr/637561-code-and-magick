'use strict';
(function () {

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  window.setup = document.querySelector('.setup');
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var inputCoatColor = window.setup.querySelector('input[name=coat-color]');
  var inputEyesColor = window.setup.querySelector('input[name=eyes-color]');
  var form = document.querySelector('.setup-wizard-form');


  var renderWizard = function (paramWizard) {
    var element = similarWizardTemplate.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = paramWizard.name;
    element.querySelector('.wizard-coat').style.fill = paramWizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = paramWizard.colorEyes;
    return element;
  };


  var onLoad = function (data) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarListElement.appendChild(fragment);

    document.querySelector('.setup-similar').classList.remove('hidden');

    wizardCoat.addEventListener('click', function () {
      var indexElement = data[window.getRandomInt(0, data.length - 1)].colorCoat;
      wizardCoat.style.fill = indexElement;
      inputCoatColor.value = indexElement;
    });

    wizardEyes.addEventListener('click', function () {
      var indexElement = data[window.getRandomInt(0, data.length - 1)].colorEyes;
      wizardEyes.style.fill = indexElement;
      inputEyesColor.value = indexElement;
    });

    fireball.addEventListener('click', function () {
      fireball.style.background = data[window.getRandomInt(0, data.length - 1)].colorFireball;
    });
  };


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.ajax('https://js.dump.academy/code-and-magick', 'POST', formData, function () {
      window.setup.classList.add('hidden');
    });
  });


  window.backend.ajax('https://js.dump.academy/code-and-magick/data', 'GET', null, onLoad);

})();
