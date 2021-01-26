/**
 * Инверсия направлений текстур выделенных панелей и блоков
 * Для выделенных блоков обрабатываются все панели
 * 
 * Вариант комбинации клавиш <Ctrl + Shift + T>
 */

Undo.RecursiveChanging(Model);

Run(Model.Selections, Model.SelectionCount);

/**
 * Пробежаться по списку
 * 
 * @param list Обрабатываемый список
 * @param count Количество элементов в списке
 */
function Run(list, count) {
  for (let i = 0; i < count; i++) {
    let obj = list[i];
    if (obj instanceof TFurnPanel) {
      ChangeOrientation(obj);
    }
    if (obj.List) {
      Run(obj, obj.Count);
    }
  }
}

/**
 * Изменить направления текстуры
 * 
 * @param panel Изменяемая панель
 */
function ChangeOrientation(panel) {
  if (panel.TextureOrientation === TextureOrientation.Horizontal) {
    panel.TextureOrientation = TextureOrientation.Vertical;
  } else if (panel.TextureOrientation === TextureOrientation.Vertical) {
    panel.TextureOrientation = TextureOrientation.Horizontal;
  }
}