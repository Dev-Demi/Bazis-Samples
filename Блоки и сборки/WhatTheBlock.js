
function WhatTheBlock(obj){
    if (obj instanceof TFurnAsm){
      // код для сборки
      return 1;
      }
      else if (obj instanceof TDraftBlock){
      // код для полуфабриката
      return 2;
      }
      else if (obj instanceof TFurnBlock){
      if (obj.DatumMode == DatumMode.None){
  
      // код для блока
      return 3;
      }
      else if (obj.DatumMode = DatumMode.Scheme){
      // код для схемы крепежа
      return 4;
      }
      else {
      // Код для блока с типом установки, отличным от схемы и никакого - скорее всего, фрагмента
      return 5;
      }
      }
  }

