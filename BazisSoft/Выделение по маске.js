UnSelectAll();
Prop = Action.Properties;

var Item = [];
var ItemAnd = [];
var ItemOr = [];
var namesMaterialPanel = [];
var namesArticleMaterialPanel = [];
var namesPanel = [];
var namesPanelPos = [];
var namesPanelDesignation = [];
var SpPanelThickness = [];
var SpPanelPlastic = [];
var SpUserProperty = [];
var namesButtMaterials = [];
var namesButts = [];
var ThicknessButts = [];
var namesFurn = [];
var namesHole = [];
var namesCuts = [];

CountPan = Prop.NewNumber('Выделено панелей', 0);
Condition = Prop.NewCombo('Условие выделения',  'И (&&)\nИЛИ (||)');
switch (Condition.ItemIndex)
     {
       case 0: { UslAnd = true
                 break;
               }
       case 1: { UslAnd = false
                 break;
               }
      }

GroupPanel = Prop.NewGroup('Панель');
GroupPanel.Expanded = false;
GroupButt = Prop.NewGroup('Кромка');
GroupButt.Expanded = false;
GroupFurn = Prop.NewGroup('Фурнитура');
GroupFurn.Expanded = false;
TipCuts = Prop.NewCombo('Тип пазов', '');

function CheckHole(hole, fast, panel) {
    var holeCenter = fast.ToGlobal({
        x: hole.Position.x + hole.Direction.x * (hole.Depth / 2),
        y: hole.Position.y + hole.Direction.y * (hole.Depth / 2),
        z: hole.Position.z + hole.Direction.z * (hole.Depth / 2),
    })
    holeCenter = panel.ToObject(holeCenter);
    return (holeCenter.x > panel.GMin.x) && (holeCenter.x < panel.GMax.x) &&
        (holeCenter.y > panel.GMin.y) && (holeCenter.y < panel.GMax.y) &&
        (holeCenter.z > panel.GMin.z) && (holeCenter.z < panel.GMax.z);
}

Model.forEachPanel(function(panel) {
    var fasts = panel.FindConnectedFasteners();
    for (var i = 0; i < fasts.length; i++) {
        var fast = fasts[i];
        var sign = ExtractMatName(fast.Name);
        if (namesFurn.indexOf(sign) < 0)
            namesFurn.push(sign);
        var holes = fast.Holes;
        if (holes && holes.Count > 0) {
            for (var j = 0; j < holes.Count; j++) {
                var hole = holes[j];
                if (CheckHole(hole, fast, panel)) {
                    sign1 = 'D ' + hole.Diameter.toFixed(1) + ' x ' + hole.Depth.toFixed(1);
                    if (namesHole.indexOf(sign1) < 0) {
                        namesHole.push(sign1);
                    }
                }
            }
        }
    }
})

//Заполнение списков
Model.forEachPanel(function (panel) {
        var sign = ExtractMatName(panel.MaterialName);
        if (namesMaterialPanel.indexOf(sign) < 0) {
            namesMaterialPanel.push(sign);
        }

        sign = ExtractMatCode(panel.MaterialName);
        if (namesArticleMaterialPanel.indexOf(sign) < 0) {
            namesArticleMaterialPanel.push(sign);
        }

        sign = panel.ArtPos;
        if (namesPanelPos.indexOf(sign) < 0) {
            namesPanelPos.push(sign);
        }

        sign = panel.Designation;
        if (namesPanelDesignation.indexOf(sign) < 0) {
            namesPanelDesignation.push(sign);
        }

        sign = panel.Thickness;
        if (SpPanelThickness.indexOf(sign) < 0) {
            SpPanelThickness.push(sign);
        }

        sign = panel.Name;
        if (namesPanel.indexOf(sign) < 0) {
            namesPanel.push(sign);
        }

        for (var i = 0; i < panel.Plastics.Count; i++) {
        var sign =  ExtractMatName(panel.Plastics[i].Material);
        if (SpPanelPlastic.indexOf(sign) < 0) {
            SpPanelPlastic.push(sign);
            }
        }

        for (var i = 0; i < panel.UserPropCount; i++) {
        var sign = panel.UserPropertyName[i] + ' = "' + ExtractMatName(panel.UserProperty[i]) + '"';
        if (SpUserProperty.indexOf(sign) < 0) {
            SpUserProperty.push(sign);
            }
        }

        for (var i = 0; i < panel.Butts.Count; i++) {
        var sign = ExtractMatName(panel.Butts.Butts[i].Material);
        if (namesButtMaterials.indexOf(sign) < 0) {
            namesButtMaterials.push(sign);
            }
        }

        for (var i = 0; i < panel.Butts.Count; i++) {
        var sign = panel.Butts.Butts[i].Sign;
        if (namesButts.indexOf(sign) < 0) {
            namesButts.push(sign);
            }
        }

        for (var i = 0; i < panel.Butts.Count; i++) {
        var sign = panel.Butts.Butts[i].Thickness;
        if (ThicknessButts.indexOf(sign) < 0) {
            ThicknessButts.push(sign);
            }
        }

        for (var i = 0; i < panel.Cuts.Count; i++) {
        var sign = panel.Cuts[i].Sign;
        if (namesCuts.indexOf(sign) < 0) {
            namesCuts.push(sign);
            }
        }
})

///////////////////////////////////
//Выделение панелей по материалу
function SelectMaterialPanel(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = ExtractMatName(panel.MaterialName);
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                }
            else
                {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
        };
    };
    if (UslAnd) Item = ItemAnd;
};

//Создание выпадающего списка и добавление туда имен материалов панелей
MaterialPanel = GroupPanel.NewCombo('Имя материала', '');
MaterialPanel.AddItem('');
namesMaterialPanel.sort();
for (var i = 0; i < namesMaterialPanel.length; i++) {
    MaterialPanel.AddItem(namesMaterialPanel[i]);
};
///////////////////////////////////

///////////////////////////////////
//Выделение панелей по артикулу материала
function SelectArticleMaterialPanel(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = ExtractMatCode(panel.MaterialName);
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда артикулов материалов панелей
ArticleMaterialPanel = GroupPanel.NewCombo('Артикул материала', '');
ArticleMaterialPanel.AddItem('');
namesArticleMaterialPanel.sort();
for (var i = 0; i < namesArticleMaterialPanel.length; i++) {
    ArticleMaterialPanel.AddItem(namesArticleMaterialPanel[i]);
}
///////////////////////////////////

///////////////////////////////////
//Выделение панелей по имени
function SelectNames(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = panel.Name;
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда имен панелей
TipNames = GroupPanel.NewCombo('Имена панелей', '');
TipNames.AddItem('');
namesPanel.sort();
for (var i = 0; i < namesPanel.length; i++) {
    TipNames.AddItem(namesPanel[i]);
}
///////////////////////////////////

///////////////////////////////////
TipСontains = GroupPanel.NewString('Имя панели содержит', '');

function SelectСontains(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = panel.Name;
        if ((value != '') && (sign.indexOf(value) > -1)) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}
///////////////////////////////////

///////////////////////////////////
//Выделение панелей по позиции
function SelectPanelPos(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = panel.ArtPos;
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда позиций панелей
TipPanelPos = GroupPanel.NewCombo('Позиции панелей', '');
TipPanelPos.AddItem('');
namesPanelPos.sort();
for (var i = 0; i < namesPanelPos.length; i++) {
    TipPanelPos.AddItem(namesPanelPos[i]);
}
///////////////////////////////////

///////////////////////////////////
//Выделение панелей по обозначению
function SelectPanelDesignation(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = panel.Designation;
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}
//Создание выпадающего списка и добавление туда позиций панелей
TipPanelDesignation = GroupPanel.NewCombo('Обозначение панелей', '');
TipPanelDesignation.AddItem('');
namesPanelDesignation.sort();
for (var i = 0; i < namesPanelDesignation.length; i++) {
    TipPanelDesignation.AddItem(namesPanelDesignation[i]);
}
///////////////////////////////////

///////////////////////////////////
//Создание выпадающего списка и добавление туда толщин панелей
TipPanelThickness = GroupPanel.NewCombo('Толщина панели', '');
TipPanelThickness.AddItem('');
SpPanelThickness.sort();
for (var i = 0; i < SpPanelThickness.length; i++) {
    TipPanelThickness.AddItem(SpPanelThickness[i]);
}

//Выделение панелей по толщине
function SelectPanelThickness(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var sign = panel.Thickness;
        if (value == sign) {
            if (UslAnd) {
                if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
            } else {
                if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

///////////////////////////////////

///////////////////////////////////
//Создание выпадающего списка и добавление туда пластиков панелей
TipPanelPlastic = GroupPanel.NewCombo('Пластик на панели', '');
TipPanelPlastic.AddItem('');
SpPanelPlastic.sort();
for (var i = 0; i < SpPanelPlastic.length; i++) {
    TipPanelPlastic.AddItem(SpPanelPlastic[i]);
}

//Выделение панелей по пластику
function SelectPanelPlastic(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.Plastics.Count; i1++) {
            var sign = ExtractMatName(panel.Plastics[i1].Material);
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

///////////////////////////////////

///////////////////////////////////
//Создание выпадающего списка и добавление туда пользоательских свойств панелей
TipPanelUsrProperty = GroupPanel.NewCombo('Пользовательские свойства', '');
TipPanelUsrProperty.AddItem('');
SpUserProperty.sort();
for (var i = 0; i < SpUserProperty.length; i++) {
    TipPanelUsrProperty.AddItem(SpUserProperty[i]);
}

//Выделение панелей по пользовательским свойствам
function SelectPanelUserProperty(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.UserPropCount; i1++) {
            var sign = panel.UserPropertyName[i1] + ' = "' + panel.UserProperty[i1].toString().trim() + '"';
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

///////////////////////////////////


///////////////////////////////////
//Выделение кромок по материалу
function SelectButtMaterials(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.Butts.Count; i1++) {
            var sign = ExtractMatName(panel.Butts.Butts[i1].Material);
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда имен материалов кромок
TipMaterialKromki = GroupButt.NewCombo('Материал кромки', '');
TipMaterialKromki.AddItem('');
namesButtMaterials.sort();
for (var i = 0; i < namesButts.length; i++) {
    TipMaterialKromki.AddItem(namesButtMaterials[i]);
}
///////////////////////////////////

///////////////////////////////////
//Выделение кромок по обозначению
function SelectButts(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.Butts.Count; i1++) {
            var sign = panel.Butts.Butts[i1].Sign;
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда имен кромок
TipKromki = GroupButt.NewCombo('Тип кромки', '');
TipKromki.AddItem('');
namesButts.sort();
for (var i = 0; i < namesButts.length; i++) {
    TipKromki.AddItem(namesButts[i]);
}
///////////////////////////////////

///////////////////////////////////
//Выделение толщин кромок
function SelectThicknessButts(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.Butts.Count; i1++) {
            var sign = panel.Butts.Butts[i1].Thickness;
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда толщин кромок
ThicknessKromki = GroupButt.NewCombo('Толщина кромки', '');
ThicknessKromki.AddItem('');
ThicknessButts.sort();
for (var i = 0; i < ThicknessButts.length; i++) {
    ThicknessKromki.AddItem(ThicknessButts[i]);
}
///////////////////////////////////


///////////////////////////////////
//Выделение фурнитуры
function SelectFurn(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var fasts = panel.FindConnectedFasteners();
        for (var i1 = 0; i1 < fasts.length; i1++) {
            var fast = fasts[i1];
            var sign = ExtractMatName(fast.Name);
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0)
                        ItemAnd.push(panel);
                    if (ItemAnd.indexOf(fast) < 0)
                        ItemAnd.push(fast);
                } else {
                    if (ItemOr.indexOf(panel) < 0)
                        ItemOr.push(panel);
                    if (ItemOr.indexOf(fast) < 0)
                        ItemOr.push(fast);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда имен фурнитуры
TipNameFurn = GroupFurn.NewCombo('Наименование', '');
TipNameFurn.AddItem('');
namesFurn.sort();
for (var i = 0; i < namesFurn.length; i++) {
    TipNameFurn.AddItem(namesFurn[i]);
}
///////////////////////////////////

///////////////////////////////////
//Выделение отверстий
function SelectHole(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        var fasts = panel.FindConnectedFasteners();
        for (var i1 = 0; i1 < fasts.length; i1++) {
            var fast = fasts[i1];
            var holes = fast.Holes;
            if (holes && holes.Count > 0) {
                for (var j = 0; j < holes.Count; j++) {
                    var hole = holes[j];
                    if (CheckHole(hole, fast, panel)) {
                        sign = 'D ' + hole.Diameter.toFixed(1) + ' x ' + hole.Depth.toFixed(1);
                        if (value == sign) {
                            if (UslAnd) {
                                if (ItemAnd.indexOf(panel) < 0)
                                    ItemAnd.push(panel);
                                if (ItemAnd.indexOf(fast) < 0)
                                    ItemAnd.push(fast);
                            } else {
                                if (ItemOr.indexOf(panel) < 0)
                                    ItemOr.push(panel);
                                if (ItemOr.indexOf(fast) < 0)
                                    ItemOr.push(fast);
                            }
                        }
                    }
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда размеров отверстий
TipNameHole = GroupFurn.NewCombo('Отверстия', '');
TipNameHole.AddItem('');
namesHole.sort();
for (var i = 0; i < namesHole.length; i++) {
    TipNameHole.AddItem(namesHole[i]);
}
///////////////////////////////////


///////////////////////////////////
//Выделение пазов
function SelectCuts(c) {
    var value = c.Value;
    if (value == '') return;
    ItemAnd = [];
    for (var i = 0; i < Item.length; i++) {
        panel = Item[i];
        for (var i1 = 0; i1 < panel.Cuts.Count; i1++) {
            var sign = panel.Cuts[i1].Sign;
            if (value == sign) {
                if (UslAnd) {
                    if (ItemAnd.indexOf(panel) < 0) ItemAnd.push(panel)
                } else {
                    if (ItemOr.indexOf(panel) < 0) ItemOr.push(panel);
                }
            }
        }
    }
    if (UslAnd) {
        Item = ItemAnd;
    }
}

//Создание выпадающего списка и добавление туда имен пазов
TipCuts.AddItem('');
namesCuts.sort();
for (var i = 0; i < namesCuts.length; i++) {
    TipCuts.AddItem(namesCuts[i]);
}
///////////////////////////////////

function SelectMask() {
    CountPan.Visible = true;
    Model.UnSelectAll();

    Item.length = 0;
    Model.forEachPanel((panel) => {
        Item.push(panel);
    })

    if (GroupPanel.Expanded) {
        SelectMaterialPanel(MaterialPanel);
        SelectArticleMaterialPanel(ArticleMaterialPanel);
        SelectPanelThickness(TipPanelThickness);
        SelectNames(TipNames);
        SelectСontains(TipСontains);
        SelectPanelPos(TipPanelPos);
        SelectPanelDesignation(TipPanelDesignation);
        SelectPanelPlastic(TipPanelPlastic);
        SelectPanelUserProperty(TipPanelUsrProperty);
    };

    if (GroupButt.Expanded) {
        SelectButtMaterials(TipMaterialKromki);
        SelectButts(TipKromki);
        SelectThicknessButts(ThicknessKromki);
    };
    if (GroupFurn.Expanded) {
        SelectFurn(TipNameFurn);
        SelectHole(TipNameHole);
    }
    SelectCuts(TipCuts);

    SumStr = MaterialPanel.Value +
             ArticleMaterialPanel.Value +
             ArticleMaterialPanel.Value +
             TipPanelThickness.Value +
             TipNames.Value +
             TipСontains.Value +
             TipPanelPos.Value +
             TipPanelDesignation.Value +
             TipPanelPlastic.Value +
             TipPanelUsrProperty.Value +
             TipMaterialKromki.Value +
             TipKromki.Value +
             ThicknessKromki.Value +
             TipCuts.Value +
             TipNameFurn.Value +
             TipNameHole.Value;

    SumStr = SumStr.trim();
    if (SumStr == '') {
        Item.length = 0;
        Model.UnSelectAll();
    }

    if (UslAnd) Item = ItemAnd
        else Item = ItemOr;
    for (var i = 0; i < Item.length; i++) {
      panel = Item[i];
      panel.Selected = true;
    };
    CountPan.Value = Item.length;
    ItemOr = [];
};

Model.forEachPanel((panel) => {
    Item.push(panel);
}
);

NotRectangleBtn = Prop.NewButton('Контур не прямоугольный');
NotRectangleBtn.OnClick = function () {
    CountPan.Visible = false;
    Model.forEachPanel(function (Panel) {
        if (!(Panel.Contour.IsContourRectangle())) Panel.Selected = true;
    }
    )
}

ArcCircleBtn = Prop.NewButton('Контур с дугами или окружностями');
ArcCircleBtn.OnClick = function () {
    CountPan.Visible = false;
    Model.forEachPanel(function (Panel) {
        for (var i = 0; i < Panel.Contour.Count; i++) {
            if (Panel.Contour[i].ElType == 2) Panel.Selected = true; //Это дуга
            if (Panel.Contour[i].ElType == 3) Panel.Selected = true; //Это окружность
        }
    }
    )
}

SelectProfilBtn = Prop.NewButton('Профили');
SelectProfilBtn.OnClick = function () {
    CountPan.Visible = false;
    var extrusions = []; //профиля
    Model.forEach((obj) => {
        if (obj){ // объекта может и не быть
            if (obj instanceof TExtrusionBody)
                obj.Selected = true;
        }
    }
    )
}

SelectBodyTrajBtn = Prop.NewButton('Тела по траектории');
SelectBodyTrajBtn.OnClick = function () {
    CountPan.Visible = false;
    var trajs = []; // траектории
    Model.forEach((obj)=>{
        if (obj){ // объекта может и не быть
            if (obj instanceof TTrajectoryBody)
                obj.Selected = true;
        }
    }
    )
}

SelectModelLimitsBtn = Prop.NewButton('Габаритные рамки');

function InToList(obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if (objChild.Name == 'Габаритная рамка') objChild.Selected = true;  //Можно проверить на имя объекта
        if (objChild instanceof TFurnBlock) InToList(objChild); //Если это блок, заходим в блок
    }
}

SelectModelLimitsBtn.OnClick = function() {
    for (var i = 0; i < Model.Count; i++) {
        obj = Model.Objects[i];
        if (obj.Name == 'Габаритная рамка') obj.Selected = true;  //Можно проверить на имя объекта
        if (obj instanceof TFurnBlock) InToList(obj); //Если это блок, заходим в блок
    }
};

Prop.NewLabel('');

UnSelectBtn = Prop.NewButton('Отменить выделение');
UnSelectBtn.OnClick = function () {
    CountPan.Value = 0;
    UnSelectAll();
};

InvertSelectBtn = Prop.NewButton('Инвертировать выделение');
InvertSelectBtn.OnClick = function () {
    CountPan.Visible = false;
    Model.forEachPanel(function (Panel) {
        Panel.Selected = !Panel.Selected;
    })

    var extrusions = []; //профиля
    Model.forEach((obj)=>{
        if (obj){ // объекта может и не быть
            if (obj instanceof TExtrusionBody)
                obj.Selected = !obj.Selected;
        }
    }
    )

    var trajs = []; // траектории
    Model.forEach((obj)=>{
        if (obj){ // объекта может и не быть
            if (obj instanceof TTrajectoryBody)
                obj.Selected = !obj.Selected;
        }
    }
    )

}

Prop.OnChange = function() {
switch (Condition.ItemIndex)
     {
       case 0: { UslAnd = true
                 break;
               }
       case 1: { UslAnd = false
                 break;
               }
      }
    SelectMask();
};

FileOptions = 'Выделение по маске.xml';
Action.Properties.Load(FileOptions);
CountPan.Value = 0;
Action.OnFinish = function() {
  Action.Properties.Save(FileOptions);
}

Action.Continue();