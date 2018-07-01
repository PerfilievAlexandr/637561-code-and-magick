'use strict';
(function () {


  var form = document.querySelector('.setup-wizard-form');

  var wizzards = [];
  var coatColor;
  var eyesColor;

  var getRank = function (wizzard) {
    var rank = 0;

    if (wizzard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizzard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparotor = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizzards = function () {

    window.render.render(wizzards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparotor(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = window.debounse.debounse(function (color) {
    eyesColor = color;
    updateWizzards();
  });


  var onCoatChange = window.debounse.debounse(function (color) {
    coatColor = color;
    updateWizzards();
  });

  var onLoad = function (data) {
    wizzards = data;
    updateWizzards();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.backend.ajax('https://js.dump.academy/code-and-magick', 'POST', formData, function () {
      window.setup.classList.add('hidden');
    });
  });


  window.backend.ajax('https://js.dump.academy/code-and-magick/data', 'GET', null, onLoad);

  window.setup = {
    onEyesChange: onEyesChange,
    onCoatChange: onCoatChange
  };

})();
