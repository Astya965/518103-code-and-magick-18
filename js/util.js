'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {

    /**
     * Вызов события, которое использует ESC
     * @param {Evt} evt
     * @param {Function} action - Функция, которая вызывается в событии с использованием ESC
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    /**
     * Вызов события, которое использует ESC
     * @param {Evt} evt
     * @param {Function} action - Функция, которая вызывается в событии с использованием ESC
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
