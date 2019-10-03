'use strict';

(function () {
  var setupForm = window.util.elems.setupPopup.querySelector('.setup-wizard-form');
  var setupCharacter = window.util.elems.setupPopup.querySelector('.setup-wizard');
  var characterCoat = setupCharacter.querySelector('.wizard-coat');
  var characterEyes = setupCharacter.querySelector('.wizard-eyes');
  var characterFireball = window.util.elems.setupPopup.querySelector('.setup-fireball-wrap');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarСharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  /**
   * Генерация случайного персонажа
   * @param {Object} character - Объект с данными персонажа
   * @return {HTMLElemet} Шаблон для генерации персонажа
   */
  var renderCharacter = function (character) {
    var characterElement = similarСharacterTemplate.cloneNode(true);

    var characterName = characterElement.querySelector('.setup-similar-label');
    var characterCoatColor = characterElement.querySelector('.wizard-coat');
    var characterEyesColor = characterElement.querySelector('.wizard-eyes');
    characterName.textContent = character.name;
    characterCoatColor.style.fill = character.colorCoat;
    characterEyesColor.style.fill = character.colorEyes;

    return characterElement;
  };

  /**
   * @description Отображает похожих персонажей в модальном окне
   * @param {Array} dataArray
   */
  var showSimilarCharacters = function (dataArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.const.CHARACTER_COUNT; i++) {
      fragment.appendChild(renderCharacter(dataArray[i]));
    }
    similarListElement.appendChild(fragment);
  };

  /**
   * @description Показывает похожих персонажей в модальном окне
   */
  var showSimilarCharactersSection = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  /**
   * @description Смена цвета одежды персонажа при клике на одежду
   */
  characterCoat.addEventListener('click', function () {
    var playersCharacterCoatColor = window.util.getRandomElement(window.util.const.CLOTHER_СOLORS);
    characterCoat.style = 'fill: ' + playersCharacterCoatColor;
    window.util.elems.setupPopup.querySelector('input[name="coat-color"]').value = playersCharacterCoatColor;
  });

  /**
   * @description Смена цвета глаз персонажа при клике на глаза
   */
  characterEyes.addEventListener('click', function () {
    var playersCharacterEyesColor = window.util.getRandomElement(window.util.const.EYES_COLORS);
    characterEyes.style = 'fill: ' + playersCharacterEyesColor;
    window.util.elems.setupPopup.querySelector('input[name="eyes-color"]').value = playersCharacterEyesColor;
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
    window.backend.save(window.backend.url.SAVE, new FormData(setupForm), function () {
      window.util.onSuccess('Данные успешно сохранены');
      window.dialog.closePopup();
    }, window.util.onError);
  });

  window.backend.load(window.backend.url.LOAD, function (wizards) {
    showSimilarCharactersSection();
    showSimilarCharacters(wizards);
  }, window.util.onError);

})();
