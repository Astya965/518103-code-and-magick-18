'use strict';

var FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CLOTHER_СOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var CHARACTER_COUNT = 4;
var similarListElement = document.querySelector('.setup-similar-list');
var similarСharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var playerSetup = document.querySelector('.setup');

/**
 * @description Показывает модальное окно
 */
var showDialog = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
  playerSetup.classList.remove('hidden');
};

/**
 * Выбор случайного элемента массива
 * @param {array} array
 * @return {string|number|Object} Случайный элемент массива
 */
var getRandomElement = function (array) {
  var randonIndex = Math.floor(Math.random() * (array.length));
  return array[randonIndex];
};

/**
 * Генерация данных персонажа
 * @return {Object} Данные персонажа (имя, цвет одежды, цвет глаз)
 */
var generateCharacterData = function () {
  return {
    name: getRandomElement(FIRSTNAMES) + ' ' + getRandomElement(SURNAMES),
    coatColor: getRandomElement(CLOTHER_СOLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

/**
 * Генерация случайного персонажа
 * @param {Object} character - Объект с данными персонажа
 * @return {string} Шаблон для генерации персонажа
 */
var renderCharacter = function (character) {
  var characterElement = similarСharacterTemplate.cloneNode(true);

  var characterName = characterElement.querySelector('.setup-similar-label');
  var characterCoatColor = characterElement.querySelector('.wizard-coat');
  var characterEyesColor = characterElement.querySelector('.wizard-eyes');
  characterName.textContent = character.name;
  characterCoatColor.style.fill = character.coatColor;
  characterEyesColor.style.fill = character.eyesColor;

  return characterElement;
};

/**
 * @description Отображает похожих персонажей в модальном окне
 */
var showSimilarCharacters = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < CHARACTER_COUNT; i++) {
    var characterData = generateCharacterData();
    fragment.appendChild(renderCharacter(characterData));
  }
  similarListElement.appendChild(fragment);
};

showSimilarCharacters();
showDialog();
