Prop = Action.Properties;
var STorcPan = 0;
    SSurfacePan = 0;
    S2SurfacePan = 0;

Model.forEachPanel(function (panel){
    if ((panel.AsPanel) && (panel.Selected)) {
        LCont = 0;
        for (var i = 0; i < panel.Contour.Count; i++) {
            ElCont = panel.Contour[i];
            LCont = LCont + ElCont.ObjLength();
        }
        STorcPan = STorcPan + LCont * panel.Thickness;
        SSurfacePan = SSurfacePan + panel.Contour.Width * panel.Contour.Height;
        S2SurfacePan = S2SurfacePan + 2 * panel.Contour.Width * panel.Contour.Height;
    }
})

STorcPan = STorcPan / 1000 / 1000;
SSurfacePan = SSurfacePan / 1000 / 1000;
S2SurfacePan = S2SurfacePan / 1000 / 1000;
SAll = STorcPan + S2SurfacePan;

STorcPan = Prop.NewString('Площадь торцов выделенных панелей', STorcPan.toFixed(6));
SSurfacePan = Prop.NewString('Площадь выделенных панелей', SSurfacePan.toFixed(6));
S2SurfacePan = Prop.NewString('Площадь паверхности выделенных панелей', S2SurfacePan.toFixed(6));
SAll = Prop.NewString('Площадь всех паверхностей выделенных панелей', SAll.toFixed(6));

Action.Continue();
