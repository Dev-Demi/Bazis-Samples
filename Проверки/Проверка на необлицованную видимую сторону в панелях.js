WarnMessage='';
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
        //Если облицовки нет и ближайшие панели находятся на расстоянии 5 мм и более. (panel.IsButtVisible(i, 5))
        if ((!YesButt) && (panel.IsButtVisible(i, 5))) {
            if ((panel.Thickness>10)&&(panel.ArtPos>0))
             if (!((panel.MaterialName.indexOf('МДФ')>=0)&&(panel.Thickness!=18.5)) )   // Если это панель в названии материала которой не содержится "МДФ" и толщина панели не равна 18,5
                AddButt = true;
        }
    }
    //Перестраиваем панель после добавления облицовки.
    if (AddButt) {
        panel.Build();
        panel.Selected = true; //Подсвечиваем панель. Признак того, что нанесли облицовку.
        WarnMessage += panel.ArtPos+" ";
    }
})
if (WarnMessage.length>1) 
	alert("Обнаружены панели с видимой необлицованной кромкой: "+WarnMessage);