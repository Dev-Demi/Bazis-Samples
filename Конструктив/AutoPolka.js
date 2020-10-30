
kolp = 0;
var arr = [];

SetCamera(p3dFront);
LeftPanel = GetPanel('Укажите левую панель');
RightPanel = GetPanel('Укажите правую панель');
Left = LeftPanel.GabMax.x;
Right = RightPanel.GabMin.x;

Top = GetEdge('Укажите верхнюю границу', AxisX).First.y;
Bottom = GetEdge('Укажите нижнюю границу', AxisX).First.y;

SetCamera(p3dLeft);
Back = GetEdge('Укажите заднюю границу', AxisY).First.z;
Front = GetEdge('Укажите переднюю границу', AxisY).First.z;

SetCamera(p3dIsometric);

Prop = Action.Properties;
kp = Prop.NewNumber('Кол-во полок', kolp);
gr = Prop.NewGroup('Интервалы');

KrMat = Prop.NewButt("Кромка");
KrMat.OnChange = function() {
  MakePolki();
 }

BtnStop = Prop.NewButton("Закончить");
BtnStop.OnClick = function() {
   SetCamera(p3dIsometric);
   Action.Finish();
  }

SchemeL = Action.Properties.NewFurnitureValue();
SchemeL.DatumModeFilter = DatumMode.Scheme;
SchemeL.Choose();

SchemeR = Action.Properties.NewFurnitureValue();
SchemeR.DatumModeFilter = DatumMode.Scheme;
SchemeR.Choose();

var tempInfo = SchemeR.GetInfo();
tempInfo.Params.Name += '2';
SchemeR.LoadFromFurnInfo(tempInfo);

function MakeInterface() {
 gr.Clear() ;
 kp.Value = kolp;
 for (var i = 0; i <= kp.Value; i++) {
     interv = gr.NewNumber('Interval '+i, 0);
     interv.OnChange = function () {
      MakePolki();
     }
     arr[i] = interv;
    }
}

function MakePolki () {
 autoh = 0;
 hizv=0;
 kauto=kolp+1;
 DeleteNewObjects()

 for (var i = 0; i <= kolp; i++) {
     interv = arr[i];
     if (interv.Value != 0) {
       hizv = hizv + interv.Value;
       kauto=kauto-1;
      }
     }
 hfree = Top-Bottom-hizv-kolp*16;
 autoh = hfree/kauto;

 for (var i = 0; i <= kolp; i++) {
     interv = arr[i];
     if (interv.Value != 0) {
       interv.Name = 'Interval !0 '+interv.Value.toFixed(2);
      }
      else  {
        interv.Name = 'Interval 0 '+autoh.toFixed(2);
      }
     }

 y =  Top;
 for (var i = 0; i < kolp; i++) {
      interv = arr[i];
     if (interv.Value != 0) {
       y=y-interv.Value;
      }
      else  {
        y=y-autoh;
      }
      y=y-16;


  Polka = AddHorizPanel(Left, Front, Right, Back, y);
  Polka.AddButt(KrMat, 0);
  SchemeL.MountScheme(LeftPanel, Polka, FurniturePosition.Up);
  SchemeR.MountScheme(RightPanel, Polka, FurniturePosition.Up);
 }
}


kp.OnChange = function() {
 kolp = kp.Value;
 MakeInterface();
 return true;
}

Action.Continue();


