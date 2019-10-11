'use strict';
(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.elems.setupPopup.querySelector('.setup-close');
  var dialogHandle = window.util.elems.setupPopup.querySelector('.upload');
  var POPUP_DEFAULT = {
    x: window.util.elems.setupPopup.style.left,
    y: window.util.elems.setupPopup.style.top
  };

  /**
   * @description Показывает модальное окно настройки персонажа
   */
  var openPopup = function () {
    window.similar.silimarCharactersLoad();
    window.util.elems.setupPopup.classList.remove('hidden');
    window.util.elems.setupPopup.style.left = POPUP_DEFAULT.x;
    window.util.elems.setupPopup.style.top = POPUP_DEFAULT.y;
  };

  /**
   * @description Закрывает модальное окно настройки персонажа
   */
  var closePopup = function () {
    window.util.elems.setupPopup.classList.add('hidden');
    window.similar.silimarCharactersRemove();
  };

  /**
   * Закрытия окна при нажатии на ESC
   * @param {Event} evt
   */
  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
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

      window.util.elems.setupPopup.style.top = (window.util.elems.setupPopup.offsetTop - shift.y) + 'px';
      window.util.elems.setupPopup.style.left = (window.util.elems.setupPopup.offsetLeft - shift.x) + 'px';

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

  window.dialog = {
    closePopup: closePopup
  };

})();
