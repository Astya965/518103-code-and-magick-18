'use strict';
(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.setupPopup.querySelector('.setup-close');
  var playerNameInput = window.setup.setupPopup.querySelector('.setup-user-name');
  var isFocusOnNameInput = false;
  var dialogHandle = window.setup.setupPopup.querySelector('.upload');

  /**
   * @description Показывает модальное окно настройки персонажа
   */
  var openPopup = function () {
    window.setup.setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
   * @description Закрывает модальное окно настройки персонажа
   */
  var closePopup = function () {
    window.setup.setupPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  /**
   * Отмена закрытия окна при нажатии на ESC
   * @param {Event} evt
   */
  var onPlayerNameInputEscPress = function (evt) {
    if (isFocusOnNameInput) {
      evt.stopPropagation();
    }
    closePopup();
  };

  /**
   * Закрытия окна при нажатии на ESC
   * @param {Event} evt
   */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, onPlayerNameInputEscPress);
  };

  /**
   * @description Событие открытия окна настройки персонажа при клике мышью на иконку пользователя
   */
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  /**
   * Событие открытия окна настройки персонажа при нажание Enter при фокусе на иконке пользователя
   * @param {Event} evt
   */
  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  /**
   * @description Событие закрытия окна настройки персонажа при клике мышью на крестик в меню настройки персонажа
   */
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  /**
   * Событие закрытия окна настройки персонажа при нажание Enter при фокусе на крестике в меню настройки персонажа
   * @param {Event} evt
   */
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  /**
   * @description Событие закрытия окна настройки персонажа при нажатии на ECS
   */
  document.addEventListener('keydown', onPopupEscPress);

  /**
   * @description Событие отмены закрытия окна настройки персонажа, если фокус находится на поле ввода
   */
  playerNameInput.addEventListener('focus', function () {
    isFocusOnNameInput = true;
  });

  /**
   * @description Удаляет событие отмены закрытия окна настройки персонажа, если фокус убирается на поля ввода
   */
  playerNameInput.addEventListener('blur', function () {
    isFocusOnNameInput = false;
  });

  /**
   * Событие перетаскивания окна, активируется при нажатии левой кнопки мыши на аватар пользователя в окне персонажа
   * @param {Event} evt
   */
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    /**
     * Функция, вычисляет насколько произошло смещение при движении мышью и устанавливает новые координаты для окна персонажа
     * @param {Event} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.setup.setupPopup.style.top = (window.setup.setupPopup.offsetTop - shift.y) + 'px';
      window.setup.setupPopup.style.left = (window.setup.setupPopup.offsetLeft - shift.x) + 'px';

    };

    /**
     * Функция, убирает конфликт между установкой нового аватара пользователя и перетаскиванием диалогового окна
     * @param {Event} upEvt
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
