//Ограничения для дуги
ButtThickness1 = 0.5; //До толщины включительно
RMinInSideThickness1 = 20; //Минимальный внутренний радиус
RMinOutSideThickness1 = 10; //Минимальный наружный радиус

ButtThickness2 = 1.0; //До толщины включительно
RMinInSideThickness2 = 30; //Минимальный внутренний радиус
RMinOutSideThickness2 = 20; //Минимальный наружный радиус

ButtThickness3 = 2.0; //До толщины включительно
RMinInSideThickness3 = 40; //Минимальный внутренний радиус
RMinOutSideThickness3 = 30; //Минимальный наружный радиус

ButtThickness4 = 5.0; //До толщины включительно
RMinInSideThickness4 = 50; //Минимальный внутренний радиус
RMinOutSideThickness4 = 40; //Минимальный наружный радиус


//Ограничения для окружности
OkrButtThickness1 = 0.5; //До толщины включительно
OkrRMinInSideThickness1 = 60; //Минимальный внутренний радиус
OkrRMinOutSideThickness1 = 60; //Минимальный наружный радиус

OkrButtThickness2 = 1.0; //До толщины включительно
OkrRMinInSideThickness2 = 70; //Минимальный внутренний радиус
OkrRMinOutSideThickness2 = 70; //Минимальный наружный радиус

OkrButtThickness3 = 2.0; //До толщины включительно
OkrRMinInSideThickness3 = 80; //Минимальный внутренний радиус
OkrRMinOutSideThickness3 = 80; //Минимальный наружный радиус

OkrButtThickness4 = 5.0; //До толщины включительно
OkrRMinInSideThickness4 = 100; //Минимальный внутренний радиус
OkrRMinOutSideThickness4 = 100; //Минимальный наружный радиус


function Mess(El, InCont, panel, butt, R) {
    buttThic = 0;
    if (butt.ClipPanel) buttThic = butt.Thickness;

    sss = '';
    if (panel.ArtPos.length > 0) sss = ' Поз.' + panel.ArtPos + ' ';

    if (InCont) {
        if (El == 2) sss1 = ' наружную '
        else sss1 = ' ';
    }
    else sss1 = ' внутреннюю ';

    if (El == 2) {
        sss2 = 'дугу R=';
        if (InCont) sss3 = (R - buttThic).toFixed(1)
        else sss3 = (R + buttThic).toFixed(1);
    }
    else {
        sss2 = 'окружность D=';
        if (InCont) sss3 = (2 * (R - buttThic)).toFixed(1)
        else sss3 = (2 * (R + buttThic)).toFixed(1);
    }

    alert('На панели ' +
        panel.ContourWidth.toFixed(1) + 'x' + panel.ContourHeight.toFixed(1) +
        sss +
        ' облицовку ' + ExtractMatName(butt.Material) +
        ' толщиной ' + butt.Thickness.toFixed(1) +
        ' нельзя облицевать' + sss1 + sss2 + sss3);
};

Model.forEachPanel(function(obj) {
    var panel = obj.AsPanel;
    for (var i = 0; i < panel.Butts.Count; i++) {
        //Элемент кромка
        var butt = panel.Butts.Butts[i];
        // Элемент контура на который нанесена кромка
        var elem = panel.Contour.Objects[butt.ElemIndex];

        if (elem.ElType == 2) {
            var D = elem.AsArc();
            var P = new Object;
            P.x = 0.5 * (D.Pos1.x + D.Pos2.x);
            P.y = 0.5 * (D.Pos1.y + D.Pos2.y);
            PointInContour = panel.Contour.IsPointInside(P.x, P.y);
            ButtThickness = butt.Thickness;
            var R = Math.sqrt((D.Pos1.x - D.Center.x) * (D.Pos1.x - D.Center.x) +
                (D.Pos1.y - D.Center.y) * (D.Pos1.y - D.Center.y));
            if (PointInContour) {
                if ((ButtThickness <= ButtThickness1) &&
                    (R <= RMinOutSideThickness1)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness1) &&
                    (ButtThickness <= ButtThickness2) &&
                    (R <= RMinOutSideThickness2)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness2) &&
                    (ButtThickness <= ButtThickness3) &&
                    (R <= RMinOutSideThickness3)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness3) &&
                    (ButtThickness <= ButtThickness4) &&
                    (R <= RMinOutSideThickness4)) {
                    Mess(2, PointInContour, panel, butt, R);
                }

            } else {
                if ((ButtThickness <= ButtThickness1) &&
                    (R <= RMinInSideThickness1)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness1) &&
                    (ButtThickness <= ButtThickness2) &&
                    (R <= RMinInSideThickness2)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness2) &&
                    (ButtThickness <= ButtThickness3) &&
                    (R <= RMinInSideThickness3)) {
                    Mess(2, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > ButtThickness3) &&
                    (ButtThickness <= ButtThickness4) &&
                    (R <= RMinInSideThickness4)) {
                    Mess(2, PointInContour, panel, butt, R);
                }
            }
        }
        if (elem.ElType == 3) {
            var Okr = elem.AsCircle();
            PointInContour = panel.Contour.IsPointInside(Okr.Center.x, Okr.Center.y);
            ButtThickness = butt.Thickness;
            var R = Okr.CirRadius;
            if (PointInContour) {
                if ((ButtThickness <= OkrButtThickness1) &&
                    (R <= OkrRMinOutSideThickness1)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness1) &&
                    (ButtThickness <= OkrButtThickness2) &&
                    (R <= OkrRMinOutSideThickness2)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness2) &&
                    (ButtThickness <= OkrButtThickness3) &&
                    (R <= OkrRMinOutSideThickness3)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness3) &&
                    (ButtThickness <= OkrButtThickness4) &&
                    (R <= OkrRMinOutSideThickness4)) {
                    Mess(3, PointInContour, panel, butt, R);
                }
            } else {
                if ((ButtThickness <= OkrButtThickness1) &&
                    (R <= OkrRMinInSideThickness1)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness1) &&
                    (ButtThickness <= OkrButtThickness2) &&
                    (R <= OkrRMinInSideThickness2)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness2) &&
                    (ButtThickness <= OkrButtThickness3) &&
                    (R <= OkrRMinInSideThickness3)) {
                    Mess(3, PointInContour, panel, butt, R);
                } else
                if ((ButtThickness > OkrButtThickness3) &&
                    (ButtThickness <= OkrButtThickness4) &&
                    (R <= OkrRMinInSideThickness4)) {
                    Mess(3, PointInContour, panel, butt, R);
                }
            }
        }
    }
});