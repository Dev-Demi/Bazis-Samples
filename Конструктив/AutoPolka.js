Prop = Action.Properties;
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

KrMat = NewButtMaterialInput("Кромка");
BtnStop = NewButtonInput("Закончить");
BtnStop.OnChange = function() {
  SetCamera(p3dIsometric);
  Action.Finish()
 }
kp = Prop.NewNumber('Кол-во полок', kolp);

gr = Prop.NewGroup('Интервалы');

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
  Action.Continue();
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
       interv.Name = 'Interval !0 '+interv.Value;
      }
      else  {
        interv.Name = 'Interval 0 '+autoh;
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
  Polka.AddButt(KrMat, i);
  SchemeL.MountScheme(LeftPanel, Polka, FurniturePosition.Outside);
  SchemeR.MountScheme(RightPanel, Polka, FurniturePosition.Outside);
 }
 Action.Continue();
}


kp.OnChange = function() {
 kolp = kp.Value;
 MakeInterface();

}

  Action.Continue();


