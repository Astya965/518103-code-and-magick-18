'use strict';
(function () {
  var setupPopup = window.setup.setup;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupPopup.querySelector('.setup-close');
  var playerNameInput = setupPopup.querySelector('.setup-user-name');
  var isFocusOnNameInput = false;

  /**
   * @description Показывает модальное окно настройки персонажа
   */
  var openPopup = function () {
    setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  /**
   * @description Закрывает модальное окно настройки персонажа
   */
  var closePopup = function () {
    setupPopup.classList.add('hidden');
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

})();
