'use strict';

(function () {

  var setupForm = window.util.elems.setupPopup.querySelector('.setup-wizard-form');
  var setupCharacter = window.util.elems.setupPopup.querySelector('.setup-wizard');
  var characterCoat = setupCharacter.querySelector('.wizard-coat');
  var characterEyes = setupCharacter.querySelector('.wizard-eyes');
  var characterFireball = window.util.elems.setupPopup.querySelector('.setup-fireball-wrap');

  var character = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  /**
   * @description Смена цвета одежды персонажа при клике на одежду
   */
  characterCoat.addEventListener('click', function () {
    var playersCharacterCoatColor = window.util.getRandomElement(window.util.const.CLOTHER_СOLORS);
    characterCoat.style = 'fill: ' + playersCharacterCoatColor;
    window.util.elems.setupPopup.querySelector('input[name="coat-color"]').value = playersCharacterCoatColor;
    character.onCoatChange(playersCharacterCoatColor);
  });

  /**
   * @description Смена цвета глаз персонажа при клике на глаза
   */
  characterEyes.addEventListener('click', function () {
    var playersCharacterEyesColor = window.util.getRandomElement(window.util.const.EYES_COLORS);
    characterEyes.style = 'fill: ' + playersCharacterEyesColor;
    window.util.elems.setupPopup.querySelector('input[name="eyes-color"]').value = playersCharacterEyesColor;
    character.onEyesChange(playersCharacterEyesColor);
  });

  /**
   * @description Смена цвета фона фаербола при клике на фаербол
   */
  characterFireball.addEventListener('click', function () {
    var playersCharacterFireballColor = window.util.getRandomElement(window.util.const.FIREBALL_COLORS);
    characterFireball.style = 'background: ' + playersCharacterFireballColor;
    window.util.elems.setupPopup.querySelector('input[name="fireball-color"]').value = playersCharacterFireballColor;
  });

  /**
   * Обработчик события отправки данных формы в меню персонажа
   */
  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), function () {
      window.util.onSuccess('Данные успешно сохранены');
      window.dialog.closePopup();
    }, window.util.onError);
  });

  /**
   * Обновление отражения похожих персонажей при смене цвета глаз главного героя
   * @param {String} color - Новый цвет глаз главного героя
   */
  character.onEyesChange = window.debounce(function (color) {
    window.eyesColor = color;
    window.similar.updateSilimarCharacters();
  });

  /**
   * Обновление отражения похожих персонажей при смене цвета одежды главного героя
   * @param {String} color - Новый цвет одежды главного героя
   */
  character.onCoatChange = window.debounce(function (color) {
    window.coatColor = color;
    window.similar.updateSilimarCharacters();
  });

})();
