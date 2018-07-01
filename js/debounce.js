'use strict';
(function () {
  var DEBOUNSE_INTERVAL = 500;
  var lastTimeout = null;
  var debounse = function (fun) {

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNSE_INTERVAL);
    };
  };

  window.debounse = {
    debounse: debounse
  };
})();


