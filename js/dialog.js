'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var avatarSetup = setup.querySelector('.upload');

  avatarSetup.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var initialCoordinate = {
      x: evt.pageX,
      y: evt.pageY
    };

    var draged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      draged = true;

      var shift = {
        x: initialCoordinate.x - moveEvt.pageX,
        y: initialCoordinate.y - moveEvt.pageY
      };

      initialCoordinate = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      window.setup.style.top = '' + (window.setup.offsetTop - shift.y) + 'px';
      window.setup.style.left = '' + (window.setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (draged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          avatarSetup.removeEventListener('click', onClickPreventDefault);
        };
        avatarSetup.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
