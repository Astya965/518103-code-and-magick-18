'use strict';

(function () {
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
   * @param {Array} data - Данные персонажей
   */
  var showSimilarCharacters = function (data) {
    window.similar.elems.similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.util.const.CHARACTER_COUNT; i++) {
      fragment.appendChild(renderCharacter(data[i]));
    }
    window.similar.elems.similarListElement.appendChild(fragment);
  };

  /**
   * @description Показывает похожих персонажей в модальном окне
   */
  var showSimilarCharactersSection = function () {
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    showSimilarCharacters: showSimilarCharacters,
    showSimilarCharactersSection: showSimilarCharactersSection
  };

})();
