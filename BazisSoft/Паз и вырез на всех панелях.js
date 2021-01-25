FileOptions = 'Паз и вырез на всех панелях.xml';

Action.OnFinish = function() {
  Action.Properties.Save(FileOptions);
}

var Orient = '';
var precision = 0.01;


Prop = Action.Properties;

CutOut = Prop.NewSelector('Фрагмент паза');
CutOut.OnClick = function() {
    CutOut.Value = system.askFileName('frw');
}

GroupProfil = Prop.NewGroup('Профиль');
ProfileSection = GroupProfil.NewSelector('Фрагмент сечения профиля');
ProfileSection.OnClick = function() {
    ProfileSection.Value = system.askFileName('frw');
}

MatProfile = GroupProfil.NewMaterial('Материал профиля');
MatProfile.SetActive();

GroupStrip = Prop.NewGroup('Лента');
StripSection = GroupStrip.NewSelector('Фрагмент сечения ленты');
StripSection.OnClick = function() {
    StripSection.Value = system.askFileName('frw');
}

MatStrip = GroupStrip.NewMaterial('Материал ленты');

Action.Properties.Load(FileOptions);

function GetOrienPanel(panel) {
    X = panel.GabMax.x - panel.GabMin.x;
    Y = panel.GabMax.y - panel.GabMin.y;
    Z = panel.GabMax.z - panel.GabMin.z;
    if (Math.abs(X - panel.Thickness) < 0.001) return 'Vert';
    if (Math.abs(Y - panel.Thickness) < 0.001) return 'Gor';
    if (Math.abs(Z - panel.Thickness) < 0.001) return 'Front';
}

panelMain = GetPanel('Укажите панель');
if (panelMain == undefined) Action.Finish();
Orient = GetOrienPanel(panelMain);

if (Orient == 'Vert') SetCamera(p3dRight);
if (Orient == 'Gor') SetCamera(p3dTop);
if (Orient == 'Front') SetCamera(p3dFront);

pG = GetPoint('Укажите точку');
if (pG == undefined) Action.Finish();

if (CutOut.Value == '') {
    NameFile = system.askFileName('frw');
    FileCut = NameFile;
} else FileCut = CutOut.Value;

if (!system.fileExists(FileCut)) {
    alert('Не указан файл с фрагментом паза');
    Action.Finish();
}

PMin = new Object;
PMin.x = 1000000;
PMin.y = 1000000;
PMin.z = 1000000;

PMax = new Object;
PMax.x = -1000000;
PMax.y = -1000000;
PMax.z = -1000000;

Model.forEachPanel(function(panel) {

    panel.Contour.OrderContours(true);
    if (panel.Contour.IsClockOtherWise())
        panel.Contour.InvertDirection();

    if ((panel.AsPanel) && (panel.Visible)) { //Вырезание контура в панелях
        if (Orient == GetOrienPanel(panel)) {
            CutOutContour = NewContour();
            CutOutContour.Load(FileCut);
            if (Orient == 'Gor') CutOutContour.Rotate(0, 0, 180);
            if (Orient == 'Vert') CutOutContour.Symmetry(0, 0, 0, 1, false);
            p = panel.ToObject(pG);
            Undo.Changing(panel);
            CutOutContour.Move(p.x, p.y);
            IshContourCount = panel.AsPanel.Contour.Count;
            panel.AsPanel.Contour.Subtraction(CutOutContour);
            if (IshContourCount != panel.AsPanel.Contour.Count) { //Если контур изменился
                panel.Build();
                if (Orient == 'Vert') {
                    if (PMin.x > (panel.Position.x - panel.Thickness)) PMin.x = panel.Position.x - panel.Thickness;
                    PMin.y = pG.y;
                    PMin.z = pG.z;
                    if (PMax.x < (panel.Position.x - panel.Thickness)) PMax.x = panel.Position.x;
                    PMax.y = pG.y;
                    PMax.z = pG.z;
                }
                if (Orient == 'Front') {
                    if (PMin.z > (panel.Position.z - panel.Thickness)) PMin.z = panel.Position.z;
                    PMin.x = pG.x;
                    PMin.y = pG.y;
                    if (PMax.z < (panel.Position.z - panel.Thickness)) PMax.z = panel.Position.z + panel.Thickness;
                    PMax.x = pG.x;
                    PMax.y = pG.y;
                }
            }

        } else //Вырезание паза в горизонтальной панели.
        {
            if (panel.Visible) {
                Orient1 = GetOrienPanel(panel);
                p = panel.ToObject(pG);

                if (Orient1 == 'Gor') {
                    Log = false;
                    if (Orient == 'Vert') { //Вырезание паза слева направо
                        if (((p.z + precision >= 0) && (p.z < panel.GSize.z)) &&
                            ((p.y >= 0) && (p.y < panel.GSize.y))) {

                            CutContour = NewContour();
                            CutContour.Load(FileCut);
                            CutContour.Move(0, p.z);
                            Undo.Changing(panel);
                            panel.Cuts.Add();
                            Cut = panel.Cuts[panel.Cuts.Count - 1];
                            Cut.Name = 'Паз под профиль';
                            Cut.Sign = 'Паз 6,5х17 LED';

                            Cut.Trajectory.AddLine(0, p.y, panel.GSize.x, p.y);
                            if (PMin.x > panel.Position.x) PMin.x = panel.Position.x;
                            if (PMax.x < (panel.Position.x + panel.GSize.x)) PMax.x = panel.Position.x + panel.GSize.x;
                            Log = true;
                        }
                    }
                    if (Orient == 'Front') { //Вырезание паза спереди назад
                        if ((((p.z + precision) >= 0) && (p.z < panel.GSize.z)) &&
                            ((p.x >= 0) && (p.x < panel.GSize.x))) {

                            CutContour = NewContour();
                            CutContour.Load(FileCut);
                            CutContour.Move(0, p.z);
                            Undo.Changing(panel);
                            panel.Cuts.Add();
                            Cut = panel.Cuts[panel.Cuts.Count - 1];
                            Cut.Name = 'Паз под профиль';
                            Cut.Sign = 'Паз 6,5х17 LED';

                            Cut.Trajectory.AddLine(p.x, 0, p.x, panel.GSize.y);
                            if (PMin.z > (panel.Position.z - panel.GSize.z)) PMin.z = panel.Position.z - panel.GSize.z
                            if (PMax.z < panel.Position.z) PMax.z = panel.Position.z;
                            Log = true;
                        }
                    }
                    if (Log) {
                        Cut.Contour.Addition(CutContour);
                        panel.Build();
                    }
                }
            }
        }
    }
});

MatProfile.SetActive();
if (ProfileSection.Value != '') {
    Profile = AddExtrusion('Профиль');
    Profile.Name = 'Профиль для LED';
    Profile.MaterialWidth = 100;
    Profile.Contour.Load(ProfileSection.Value);
    if (Orient == 'Vert') {
        Profile.Orient(AxisX, AxisY);
        Profile.Position = PMin;
        Profile.Thickness = PMax.x - PMin.x;
    }
    if (Orient == 'Front') {
        Profile.Orient(AxisZ, AxisY);
        Profile.Position = PMin;
        Profile.Thickness = PMax.z - PMin.z;
    }
}

MatStrip.SetActive();
if (StripSection.Value != '') {
    Strip = AddExtrusion('Лента LED');
    Strip.Name = 'Лента LED';
    Strip.MaterialWidth = 100;
    Strip.Contour.Load(StripSection.Value);
    if (Orient == 'Vert') {
        Strip.Orient(AxisX, AxisY);
        Strip.Position = PMin;
        Strip.Thickness = PMax.x - PMin.x;
    }
    if (Orient == 'Front') {
        Strip.Orient(AxisZ, AxisY);
        Strip.Position = PMin;
        Strip.Thickness = PMax.z - PMin.z;
    }
}

Action.Finish();