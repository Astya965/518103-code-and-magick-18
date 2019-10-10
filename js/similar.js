'use strict';

(function () {

  var similarListElement = document.querySelector('.setup-similar-list');
  var coatColor;
  var eyesColor;
  var characters = [];

  /**
   * Присваивание веса схожести с главным героем персонажу на основе цвета одежды и глаз
   * @param {Object} character - Данные персонажа
   * @return {Number} rank - Вес схожести
   */
  var getRank = function (character) {
    var rank = 0;

    if (character.colorCoat === coatColor) {
      rank += 2;
    }
    if (character.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * Дополнительный критерий сортировки на основе сравнения имен (приоритет раставляется в алфавитном порядке)
   * @param {Element} left - Левый элемент сортируемого массива
   * @param {Element} right - Правый элемент сортируемого массива
   * @return {Number} - Возвращает результат сортировки, слева или справа располагается элемент,
   * где 1 - слева, - 1 - справа, 0 - порядок сравниваемых элементов не меняется
   */
  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  /**
   * Отражение обновленного списка похожих персонажей (сортировка по схожести, по убыванию)
   */
  var updateSilimarCharacters = function () {
    silimarCharactersLoad(characters
      .slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left.name, right.name);
        }
        return rankDiff;
      }));
  };

  /**
   * Обновление отражения похожих персонажей при смене цвета глаз главного героя
   * @param {String} color - Новый цвет глаз главного героя
   */
  window.character.character.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce.debounce(updateSilimarCharacters);
  };

  /**
   * Обновление отражения похожих персонажей при смене цвета одежды главного героя
   * @param {String} color - Новый цвет одежды главного героя
   */
  window.character.character.onCoatChange = function (color) {
    coatColor = color;
    window.debounce.debounce(updateSilimarCharacters);
  };

  /**
   * @description Отражение похожих персонажей при открытии меню пероснажа
   */
  var silimarCharactersLoad = function () {
    window.backend.load(function (data) {
      characters = data;
      window.render.showSimilarCharactersSection();
      window.render.showSimilarCharacters(characters);
    }, window.util.onError);
  };

  /**
   * @description Скрытие похожих всех персонажей
   */
  var silimarCharactersRemove = function () {
    while (similarListElement.firstChild) {
      similarListElement.removeChild(similarListElement.firstChild);
    }
  };

  window.similar = {
    silimarCharactersLoad: silimarCharactersLoad,
    silimarCharactersRemove: silimarCharactersRemove,

    elems: {
      similarListElement: similarListElement
    }
  };

})();
