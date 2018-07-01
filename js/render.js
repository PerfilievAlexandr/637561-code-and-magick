'use strict';
(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderWizard = function (paramWizard) {
    var element = similarWizardTemplate.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = paramWizard.name;
    element.querySelector('.wizard-coat').style.fill = paramWizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = paramWizard.colorEyes;

    return element;
  };

  var render = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    render: render
  };

})();
