'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GRAPH_HEIGTH = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var maxTime;

var canvas = document.getElementById('statistics');
var ctx = canvas.getContext('2d');

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

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCloudTitle = function (ctx, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + GAP * 2);
};

var renderВarGraphElement = function (ctx, name, time, height, x, y) {
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(name, x, CLOUD_HEIGHT - GAP * 2);
  ctx.fillText(time, x, y - GAP * 2);
  ctx.fillStyle = name.toUpperCase() === 'ВЫ' ? 'rgba(255, 0, 0, 1)' : getRandomSaturation(240, 50);
  ctx.fillRect(x, y, BAR_WIDTH, height);

}

// Отрисовка статистики

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1');

  renderCloudTitle(ctx, CLOUD_X + GAP * 3, CLOUD_Y + GAP * 2);

  maxTime = getMaxValue(times);
  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.ceil(times[i]) * 100 / maxTime;
    var barX = CLOUD_X + BAR_WIDTH + BAR_GAP * 2 * i;
    var barY = CLOUD_Y + GAP * 8  + (BAR_GRAPH_HEIGTH - barHeight);

    renderВarGraphElement(ctx, names[i], Math.ceil(times[i]), barHeight, barX, barY);
  }
};
