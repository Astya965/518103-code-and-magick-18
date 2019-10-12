'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  /**
   * @description Обновление аватарки пользователя
   */
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      /**
      * @description Поиск совпадения расширения файла со списком расширений
      */
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        /**
        * @description При окончании загрузки указать результат загрузки в путь файла
        */
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

})();
