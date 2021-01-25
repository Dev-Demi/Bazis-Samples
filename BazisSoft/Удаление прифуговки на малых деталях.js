Model.forEachPanel(function(obj) {
    var panel = obj.AsPanel;
    Undo.Changing(panel);
    for (var i = 0; i < panel.Butts.Count; i++) {
        var butt = panel.Butts.Butts[i];
        // Элемент контура на который нанесена кромка
        var elem = panel.Contour.Objects[butt.ElemIndex];
        // на всех кромках длиной меньше 70 устанавливаем прифуговку 0
        if (elem.ObjLength() < 70)
            butt.Allowance = 0;
        // на всех кромках накатанных одним отрезом, дугах и окружностях устанавливаем прифуговку 0
        if ((butt.CutIndex > -1) || (elem.ElType == 2) || (elem.ElType == 3))
            butt.Allowance = 0;
    }
})