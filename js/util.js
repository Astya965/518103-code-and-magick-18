'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var ERROR_COLOR = 'red';
  var SUCCESS_COLOR = 'green';

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

  /**
   * Функция создания уведомления
   * @param {String} message - Текст уведомления
   * @param {String} color - Цвет уведомления
   */
  var onNotice = function (message, color) {
    var errorNotice = document.createElement('div');
    errorNotice.style = 'z-index: 100; width: 100%; margin: 0 auto; padding: 5px 0; text-align: center;';
    errorNotice.style.backgroundColor = color;
    errorNotice.style.position = 'fixed';
    errorNotice.style.top = 0;
    errorNotice.style.left = 0;
    errorNotice.style.fontSize = '24px';

    errorNotice.textContent = message;
    document.body.appendChild(errorNotice);

    setTimeout(function () {
      document.body.removeChild(errorNotice);
    }, 3500);
  };

  /**
   * Создание уведомления об ошибке
   * @param {String} errMessage - Текст уведомления
   */
  var onError = function (errMessage) {
    onNotice(errMessage, ERROR_COLOR);
  };

  /**
   * Создание уведомления об успешном выполнении функции
   * @param {String} successMessage - Текст уведомления
   */
  var onSuccess = function (successMessage) {
    onNotice(successMessage, SUCCESS_COLOR);
  };

  window.util = {
    const: {
      ESC_KEYCODE: ESC_KEYCODE,
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
    getRandomElement: getRandomElement,
    onError: onError,
    onSuccess: onSuccess
  };
})();
