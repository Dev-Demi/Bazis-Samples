/**
 * Проверяет идентичность написания имени файла
 * и наименования в параметрах изделия
 *
 * В случае различного написания, предлагает исправить написание модели
 *
 * Можно запускать при сохранении файла
 */
const pth = require("path");

let filename = pth.basename(Action.ModelFilename).slice(0, -4);
let name = Action.Control.Article.Name;

if (filename != name && filename != "") {
    let answer = confirm(
        `Не совпадают имя файла и модели:
            файл   - <${filename}>,
            модель - <${name}>

        Изменить наименование модели?`);
    if (answer) {
        Action.Control.Article.Name = filename;
    }
} else {
    //Другие задачи
}
