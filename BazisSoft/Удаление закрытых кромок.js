Distance = 1; //Расстояние от торца панели с кромкой до другой панели, которая закрывает этот торец
DelButtCount = 0;

Model.forEachPanel(function(panel) {
    ButtsCount = panel.Butts.Count;
    DelButt = false;
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
        //Если облицовка есть и ближайшие панели не находятся на расстоянии Distance мм и более. (panel.IsButtVisible(i, Distance))
        if ((YesButt) && !(panel.IsButtVisible(i, Distance))) {
            panel.Butts.Delete(i1);
            DelButtCount++;
            //Устанавливаем переменную в true что облицовка удалялась
            DelButt = true;
        }
    }
    //Перестраиваем панель после удаления облицовки.
    if (DelButt) {
        panel.Build();
        panel.Selected = true; //Подсвечиваем панель. Признак того, что удалили с не облицовку.
    }
})

if (DelButtCount > 0)
    alert('Удалено ' + DelButtCount + ' облицовок');