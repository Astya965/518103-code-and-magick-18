'use strict';

// Массивы данных

var firstnames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var clothesСolors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Обращение к template
var similarListElement = document.querySelector('.setup-similar-list');
var similarСharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Показываем окно персонажа

var playerSetup = document.querySelector('.setup');
playerSetup.classList.remove('hidden');

// Генерация случайного числа от 0 до длины массива
var getRandomElement = function (array) {
  return Math.floor(Math.random() * (array.length));
};

// Генерация массива из 4х объектов со случайными значениями свойств
var characterArray = [];
for (var i = 0; i < 4; i++) {
  var characterObject = {
    name: firstnames[getRandomElement(firstnames)] + ' ' + surnames[getRandomElement(surnames)],
    coatColor: clothesСolors[getRandomElement(clothesСolors)],
    eyesColor: eyesColors[getRandomElement(eyesColors)]
  }
  characterArray.push(characterObject);
};

// Генерация случайного персонажа
var renderCharacter = function (character) {
  var characterElement = similarСharacterTemplate.cloneNode(true);

  var characterName = characterElement.querySelector('.setup-similar-label');
  characterName.textContent = character.name;
  var characterCoatColor = characterElement.querySelector('.wizard-coat');
  characterCoatColor.style.fill = character.coatColor;
  var characterEyesColor = characterElement.querySelector('.wizard-eyes');
  characterEyesColor.style.fill = character.eyesColor;

  return characterElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < characterArray.length; j++) {
  fragment.appendChild(renderCharacter(characterArray[j]));
}
similarListElement.appendChild(fragment);

// Список похожих персонажей становится виден
document.querySelector('.setup-similar').classList.remove('hidden');
