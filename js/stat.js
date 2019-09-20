'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_MAX_HEIGTH = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

// Получение максимального числа в массиве

var getMaxValue = function (array) {
  var maxValue = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  return maxValue;
};

// Генерация случайной насыщенности в HSL

var getRandomSaturation = function (hueValue, lightness) {
  var saturation = Math.floor(Math.random() * 101);

  return 'hsl(' + hueValue + ', ' + saturation + '%,' + lightness + '%)';
};

// Создание элемнетов отрисовки статистики

var renderCloud = function (ctx, x, y) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(x + GAP, y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'rgba(255, 255, 255, 1';
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', x + GAP * 3, y + GAP * 2);
  ctx.fillText('Список результатов:', x + GAP * 3, y + GAP * 4);
};

var renderВarGraph = function (ctx, namesArray, timesArray, elementIndex) {
  var maxTime = getMaxValue(timesArray);

  var barHeight = BAR_MAX_HEIGTH / maxTime * Math.ceil(timesArray[elementIndex]);
  var barX = CLOUD_X + BAR_WIDTH + BAR_GAP * 2 * elementIndex;
  var barY = CLOUD_Y + GAP * 8 + (BAR_MAX_HEIGTH - barHeight);

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(namesArray[elementIndex], barX, CLOUD_HEIGHT - GAP * 2);
  ctx.fillText(Math.ceil(timesArray[elementIndex]), barX, barY - GAP * 2);
  ctx.fillStyle = namesArray[elementIndex].toUpperCase() === 'ВЫ' ? 'rgba(255, 0, 0, 1)' : getRandomSaturation(240, 50);
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
};

// Отрисовка статистики

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y);

  for (var i = 0; i < names.length; i++) {
    renderВarGraph(ctx, names, times, i);
  }
};
