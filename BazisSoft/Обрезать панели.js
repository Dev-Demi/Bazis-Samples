var Orient = '';

Prop = Action.Properties;

CutOut = Prop.NewSelector('Форма выреза');
CutOut.OnClick = function() {
    CutOut.Value = system.askFileName('frw');
};

function GetOrienPanel(panel) {
        X = panel.GabMax.x - panel.GabMin.x;
        Y = panel.GabMax.y - panel.GabMin.y;
        Z = panel.GabMax.z - panel.GabMin.z;
        if (Math.abs(X - panel.Thickness) < 0.001) return 'Vert';
        if (Math.abs(Y - panel.Thickness) < 0.001) return 'Gor';
        if (Math.abs(Z - panel.Thickness) < 0.001) return 'Front';
}

function CenterPanel(panel) {
    Pos = new Object;
    Pos.x = 0.5 * (panel.GMax.x + panel.GMin.x);
    Pos.y = 0.5 * (panel.GMax.y + panel.GMin.y);
    Pos.z = 0.5 * (panel.GMax.z + panel.GMin.z);
    return Pos;
}

panelMain = GetPanel('Укажите панель');
Orient = GetOrienPanel(panelMain);
if (Orient == 'Vert') SetCamera(p3dRight);
if (Orient == 'Gor') SetCamera(p3dTop);
if (Orient == 'Front') SetCamera(p3dFront);
pG = GetPoint('Укажите точку');

if (CutOut.Value == '') {
    NameFile = system.askFileName('frw');
    FileCut = NameFile;
}
else FileCut = CutOut.Value;

if (!system.fileExists(FileCut)) alert('Не указан файл с фрагментов выреза');

Model.forEachPanel(function (panel){
    if ((panel.AsPanel) && (panel.Visible)) {
        if (Orient == GetOrienPanel(panel)) {
                CutOutContour = NewContour();
                CutOutContour.Load(FileCut);
                if (Orient == 'Gor') CutOutContour.Rotate(0, 0, 180);
                p = panel.ToObject(pG);
                Undo.Changing(panel);
                CutOutContour.Move(p.x, p.y);
                panel.AsPanel.Contour.Subtraction(CutOutContour);
                panel.Build();
        }
    }
});
