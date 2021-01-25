Distance = 5; //Расстояние от торца панели с кромкой до другой панели, которая закрывает этот торец

Model.forEachPanel(function(panel) {
    ButtsCount = panel.Butts.Count;
    AddButt = false;
    for (var i = 0; i < panel.Contour.Count; i++) {
        //По умолчанию облицовок на элементе нет
        YesButt = false;
        //Перебираем все облицовки на панели
        for (var i1 = 0; i1 < ButtsCount; i1++) {
            //Берем облицовку на панели
            ButtInCont = panel.Butts.Butts[i1];
            //Если на i элементе контура есть облицовка с номером элемента ButtInCont.ElemIndex
            //присваиваем YesButt, что облицовка есть и выходим из цикла по break
            //Берем следующий элемент контура
            if (ButtInCont.ElemIndex == i) {
                YesButt = true;
                break;
            }
        }
        //Записываем изменения в историю чтобы можно было откатиться
        Undo.Changing(panel);
        //Если облицовки нет и ближайшие панели находятся на расстоянии 5 мм и более. (panel.IsButtVisible(i, 5))
        if ((!YesButt) && (panel.IsButtVisible(i, Distance))) {
            //Если на элементе контура нет облицовки, наносим облицовку 'В цвет'.
            /*
            var butt = panel.Butts.Add();
            butt.ElemIndex = i;
            butt.Material = 'В цвет';
            butt.Sign = 'В_цв';
            butt.Thickness = 1;  //Толщина
            butt.ClipPanel = true; //Подрезать на толщину кромки
            butt.Allowance = 0; //Размер прифуговки
            //Устанавливаем переменную в true что облицовка добавлялась на панель
            */
            AddButt = true;
        }
    }
    //Перестраиваем панель после добавления облицовки.
    if (AddButt) {
        panel.Build();
        panel.Selected = true; //Подсвечиваем панель. Признак того, что нанесли облицовку.
    }
})