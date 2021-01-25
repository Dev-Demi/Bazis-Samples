Prop = Action.Properties;

SObj = 0;
SContProf = 0;
VProf = 0;

LTraj = 0;
STraj = 0;
SContTraj = 0;
VTraj = 0;
VZagTraj = 0;

Model.forEach((obj) => {
    if (obj) { // объекта может и не быть
        if (obj.Selected) {
            if (obj instanceof TExtrusionBody) {
                LCont = 0;
                for (var i = 0; i < obj.Contour.Count; i++) {
                    ElCont = obj.Contour[i];
                    LCont = LCont + ElCont.ObjLength();
                }
                VProf = VProf + obj.Contour.Width * obj.Contour.Height * obj.Thickness;
                SObj = SObj + LCont * obj.Thickness;
                SContProf = SContProf + 2 * obj.Contour.Width * obj.Contour.Height;
            }

            if (obj instanceof TTrajectoryBody) {
                LCont = 0;
                for (var i = 0; i < obj.Contour2D.Count; i++) {
                    ElCont = obj.Contour2D[i];
                    LCont = LCont + ElCont.ObjLength();
                }
                LTraj = 0;
                for (var i = 0; i < obj.Trajectory2D.Count; i++) {
                    ElTraj = obj.Trajectory2D[i];
                    LTraj = LTraj + ElTraj.ObjLength();
                    VTraj = VTraj + obj.Contour2D.Width * obj.Contour2D.Height * ElTraj.ObjLength();
                }
                STraj = STraj + LTraj * LCont;
                SContTraj = SContTraj + 2 * obj.Contour2D.Width * obj.Contour2D.Height;
                VZagTraj = VZagTraj + obj.GSize.x * obj.GSize.y * obj.GSize.z;
            }
        }
    }
})

SObj = SObj / 1000 / 1000;
SProfAll = (SContProf / 1000 / 1000) + SObj;
VProf = VProf / 1000 / 1000 / 1000;

STraj = STraj / 1000 / 1000;
STrajAll = (SContTraj / 1000 / 1000) + STraj;
VTraj = VTraj / 1000 / 1000 / 1000;
VZagTraj = VZagTraj / 1000 / 1000 / 1000;

SObj = Prop.NewString('Площадь боковой поверхности выделенных профилей', SObj.toFixed(6));
SProfAll = Prop.NewString('Площадь всей поверхности выделенных профилей', SProfAll.toFixed(6));
VProf = Prop.NewString('Объем заготовок проофилей', VProf.toFixed(6));
Prop.NewSeparator();
STraj = Prop.NewString('Площадь боковой поверхности выделенных тел по траектории', STraj.toFixed(6));
STrajAll = Prop.NewString('Площадь всей поверхности выделенных тел по траектории', STrajAll.toFixed(6));
VTraj = Prop.NewString('Объем тел по траектории', VTraj.toFixed(6));
VZagTraj = Prop.NewString('Объем заготовок тел по траектории', VZagTraj.toFixed(6));

Action.Continue();
