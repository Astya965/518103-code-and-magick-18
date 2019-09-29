'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var CLOTHER_СOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var CHARACTER_COUNT = 4;

  var setupPopup = document.querySelector('.setup');
  var playerNameInput = document.querySelector('.setup-user-name');


  /**
   * Вызов события, которое использует ESC, если активным элментом не является playerNameInput
   * @param {Evt} evt
   * @param {Function} action - Функция, которая вызывается в событии с использованием ESC
   */
  var isEscEvent = function (evt, action) {
    if ((evt.keyCode === ESC_KEYCODE) && (document.activeElement !== playerNameInput)) {
      action();
    }
  };

  /**
   * Вызов события, которое использует ESC
   * @param {Evt} evt
   * @param {Function} action - Функция, которая вызывается в событии с использованием ESC
   */
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  /**
   * Выбор случайного элемента массива
   * @param {Array} array
   * @return {Any} Случайный элемент массива
   */
  var getRandomElement = function (array) {
    var randonIndex = Math.floor(Math.random() * (array.length));
    return array[randonIndex];
  };

  window.util = {
    const: {
      ESC_KEYCODE: ESC_KEYCODE,
      FIRSTNAMES: FIRSTNAMES,
      SURNAMES: SURNAMES,
      CLOTHER_СOLORS: CLOTHER_СOLORS,
      EYES_COLORS: EYES_COLORS,
      FIREBALL_COLORS: FIREBALL_COLORS,
      CHARACTER_COUNT: CHARACTER_COUNT
    },

    elems: {
      setupPopup: setupPopup
    },

    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement
  };
})();
