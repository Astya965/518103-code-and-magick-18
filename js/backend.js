'use strict';

(function () {
  var URL = 'https://js.dump.academy/code-and-magick';
  var DATA_URL = URL + '/data';
  var STATUS_SUCCESS = 200;

  /**
   * Обращение к серверу и обработка возможных ошибок
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   * @param {Function} onError - Вызов функции при ошибке
   * @return {Object} - XMLHttpRequest-объект
   */
  var initXHR = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Прeвышено время ожидания ответа от сайта. Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 15000;

    return xhr;
  };

  /**
   * Загрузка данных с сервера
   * @param {String} url - Адрес, по которому происходит обращение к серверу
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   * @param {Function} onError - Вызов функции при ошибке
   */
  var load = function (url, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('GET', url);
    xhr.send();
  };

  /**
   * Передача данных серверу
   * @param {String} url - Адрес, по которому происходит обращение к серверу
   * @param {Object} data - Данные, которые передаются серверу
   * @param {Function} onLoad - Вызов функции при успешном обращении к серверу
   * @param {Function} onError - Вызов функции при ошибке
   */
  var save = function (url, data, onLoad, onError) {
    var xhr = initXHR(onLoad, onError);
    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,

    url: {
      LOAD: DATA_URL,
      SAVE: URL
    }
  };

})();
