// Разрушает выделенные блоки, не включая вложенные блоки

function DestroyBlock(block) {
      // Если блок - Модель, то ничего не делаем, иначе посыпятся аксессы
      if (block == Model)
        return;
      // Флаг, создан ли блок скриптом (находится во временной области модели)
      var blockIsScript = block.IsOwner(Model.Temp);
      Undo.Changing(block);
      // Идём от последнего элемента к первому, т.к. при удалении объекта из блока,
      // кол-во элементов внутри уменьшается.
      for (var i = block.Count - 1; i >= 0; i--) {
        var obj = block.Objects[i];
        //Если не скриптовый блок, сохраняем изменения объекта в истории вручную
        if (! (obj instanceof TModelLimits)){
          // код для габаритной рамки

        if (!blockIsScript) {
          Undo.Changing(obj);
          Undo.OwnerChanging(obj);
        }
        obj.ReTransform(obj.Owner, block.Owner);
        obj.Owner = block.Owner;
      }}
      DeleteObject(block);
    }

 Line = [];
 Model.forEach(function (obj)
      {
        if (obj.Selected)
          Line.push(obj)
      }

 for (var i = 0; i < Line.length ; i++){
    DestroyBlock(Line[i])
  });