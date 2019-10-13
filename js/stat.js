'use strict';

(function () {
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10
  };

  var Bar = {
    WIDTH: 40,
    MAX_HEIGTH: 150,
    GAP: 50
  };

  var GAP = 10;

  /**
   * @description Получение максимального числа в массиве
   * @param {Array} array - Массив, в котором ищем максимальное число
   * @return {Number} - Максимальное значение
   */
  var getMaxValue = function (array) {
    var maxValue = array[0];

    for (var i = 0; i < array.length; i++) {
      if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }

    return maxValue;
  };

  /**
   * @description Генерация случайной насыщенности в HSL
   * @param {Number} hueValue - Оттенок (1 число в HSL)
   * @param {Number} lightness - Темнота\свет оттенка (3 число в HSL)
   * @return {String} - Значение HSL
   */
  var getRandomSaturation = function (hueValue, lightness) {
    var saturation = Math.floor(Math.random() * 101);

    return 'hsl(' + hueValue + ', ' + saturation + '%,' + lightness + '%)';
  };

  /**
   * @description Отрисовка облака статистики
   * @param {Method} ctx - Контекст отрисовки
   * @param {Number} x - Координата x
   * @param {Number} y - Координата y
   */
  var renderCloud = function (ctx, x, y) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x + GAP, y + GAP, Cloud.WIDTH, Cloud.HEIGHT);
    ctx.fillStyle = 'rgba(255, 255, 255, 1';
    ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);

    ctx.font = '16px PT Mono';
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', x + GAP * 3, y + GAP * 2);
    ctx.fillText('Список результатов:', x + GAP * 3, y + GAP * 4);
  };

  /**
   * @description Отрисовка облака статистики
   * @param {Method} ctx - Контекст отрисовки
   * @param {Array} namesArray - Массив имен игроков
   * @param {Array} timesArray - Массив времени прохождения уровня
   * @param {Index} elementIndex - Индекс элемента
   */
  var renderВarGraph = function (ctx, namesArray, timesArray, elementIndex) {
    var maxTime = getMaxValue(timesArray);

    var barHeight = Bar.MAX_HEIGTH / maxTime * Math.ceil(timesArray[elementIndex]);
    var barX = Cloud.X + Bar.WIDTH + Bar.GAP * 2 * elementIndex;
    var barY = Cloud.Y + GAP * 8 + (Bar.MAX_HEIGTH - barHeight);

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(namesArray[elementIndex], barX, Cloud.HEIGHT - GAP * 2);
    ctx.fillText(Math.ceil(timesArray[elementIndex]), barX, barY - GAP * 2);
    ctx.fillStyle = namesArray[elementIndex].toUpperCase() === 'ВЫ' ? 'rgba(255, 0, 0, 1)' : getRandomSaturation(240, 50);
    ctx.fillRect(barX, barY, Bar.WIDTH, barHeight);
  };

  /**
   * @description Полная отрисовка статистики
   * @param {Method} ctx - Контекст отрисовки
   * @param {Array} names - Массив имен игроков
   * @param {Array} times - Массив времени прохождения уровня
   */
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, Cloud.X, Cloud.Y);

    for (var i = 0; i < names.length; i++) {
      renderВarGraph(ctx, names, times, i);
    }
  };

})();
