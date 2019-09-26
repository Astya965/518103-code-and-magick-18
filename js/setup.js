'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var FIRSTNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CLOTHER_СOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var CHARACTER_COUNT = 4;
var similarListElement = document.querySelector('.setup-similar-list');
var similarСharacterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var playerNameInput = setup.querySelector('.setup-user-name');
var isFocusOnNameInput = false;
var setupCharacter = setup.querySelector('.setup-wizard');
var characterCoat = setupCharacter.querySelector('.wizard-coat');
var characterEyes = setupCharacter.querySelector('.wizard-eyes');
var characterFireball = setup.querySelector('.setup-fireball-wrap');

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
 * @return {HTMLElemet} Шаблон для генерации персонажа
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

/**
 * @description Показывает похожих персонажей в модальном окне
 */
var showDialog = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

/**
 * @description Показывает модальное окно настройки персонажа
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/**
 * @description Закрывает модальное окно настройки персонажа
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

/**
 * Отмена закрытия окна при нажатии на ESC
 * @param {Object} evt
 */
var onPlayerNameInputEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

/**
 * Закрытия окна при нажатии на ESC
 * @param {Object} evt
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (isFocusOnNameInput) {
      onPlayerNameInputEscPress();
    }
    closePopup();
  }
};

/**
 * @description Событие открытия окна настройки персонажа при клике мышью на иконку пользователя
 */
setupOpen.addEventListener('click', function () {
  openPopup();
});

/**
 * Событие открытия окна настройки персонажа при нажание Enter при фокусе на иконке пользователя
 * @param {Object} evt
 */
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

/**
 * @description Событие закрытия окна настройки персонажа при клике мышью на крестик в меню настройки персонажа
 */
setupClose.addEventListener('click', function () {
  closePopup();
});

/**
 * Событие закрытия окна настройки персонажа при нажание Enter при фокусе на крестике в меню настройки персонажа
 * @param {Object} evt
 */
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

/**
 * @description Событие закрытия окна настройки персонажа при нажатии на ECS
 */
setupClose.addEventListener('keydown', onPopupEscPress);

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
 * @description Смена цвета одежды персонажа при клике на одежду
 */
characterCoat.addEventListener('click', function () {
  var playersCharacterCoatColor = getRandomElement(CLOTHER_СOLORS);
  characterCoat.style = 'fill: ' + playersCharacterCoatColor;
  setup.querySelector('input[name="coat-color"]').value = playersCharacterCoatColor;
});

/**
 * @description Смена цвета глаз персонажа при клике на глаза
 */
characterEyes.addEventListener('click', function () {
  var playersCharacterEyesColor = getRandomElement(EYES_COLORS);
  characterEyes.style = 'fill: ' + playersCharacterEyesColor;
  setup.querySelector('input[name="eyes-color"]').value = playersCharacterEyesColor;
});

/**
 * @description Смена цвета фона фаербола при клике на фаербол
 */
characterFireball.addEventListener('click', function () {
  var playersCharacterFireballColor = getRandomElement(FIREBALL_COLORS);
  characterFireball.style = 'background: ' + playersCharacterFireballColor;
  setup.querySelector('input[name="fireball-color"]').value = playersCharacterFireballColor;
});

showSimilarCharacters();
showDialog();


