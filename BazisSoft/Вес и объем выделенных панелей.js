var WeightPan = 0;
var VPan = 0;

function CalcPanel(panel) {
    Material = ExtractMatName(panel.MaterialName).toUpperCase();
    V = (panel.GSize.x) *
        (panel.GSize.y) *
        (panel.GSize.z) / 1000 / 1000 / 1000;
    VPan = VPan + V;
    den = 0;
    if (Material.indexOf("ДСП") >=0) //В имени материала есть слово ДСП
    {
       den = 800; //Плотность ДСП
    } else
        {
        if (Material.indexOf("ДВП") >=0) //В имени материала есть слово ДВП
          {
             den = 350; //Плотность ДВП
          }
          else
            if (Material.indexOf("МДФ") >=0) //В имени материала есть слово МДФ
            {
               den = 900; //Плотность МДФ
            }
        }
    WeightPan = WeightPan + V * den;
}

var Sel = false;
var Uroven = 0;
var UrovenSel = 0;

function InToList(obj) {
    Uroven++;
    if ((obj.Selected) && (Uroven > UrovenSel)) {
        UrovenSel = Uroven;
        Sel = true;
    }
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if (objChild instanceof TFurnBlock) InToList(objChild);
        if ((obj[i] instanceof TFurnPanel) && ((Sel) || (obj[i].Selected))) {
            CalcPanel(obj[i].AsPanel);
        }
    }
    Uroven--;
    if (Uroven < UrovenSel) {
        UrovenSel = Uroven;
        Sel = false;
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    if (obj instanceof TFurnBlock) InToList(obj);
    if ((obj instanceof TFurnPanel) && (obj.Selected)) {
        CalcPanel(obj.AsPanel);
    Sel = false;
    }
}

Prop = Action.Properties;
Prop.NewString('Вес панелей (кг)', WeightPan.toFixed(3));
Prop.NewString('Объем панелей (м3)', VPan.toFixed(6));
Action.Continue();


