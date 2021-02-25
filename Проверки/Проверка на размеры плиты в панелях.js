WarnMessage='';
Model.forEachPanel(function(panel) {
    ButtsCount = panel.Butts.Count;
    AddButt = false;
 //   alert(panel.Thickness+'  w='+panel.ContourWidth+' h='+panel.ContourHeight);
    if (panel.MaterialName.indexOf('МДФ')>=0 && panel.Thickness==16)
     { if (panel.ContourHeight>2780||panel.ContourWidth>2780)
       {
         WarnMessage +=" МДФ16: "+panel.ArtPos;
       }
     }

   if (panel.MaterialName.indexOf('МДФ')>=0 && panel.Thickness==32)
      {if (panel.ContourHeight>2700 || panel.ContourWidth>2700)
       {
         WarnMessage +=" МДФ32: "+panel.ArtPos;
       }
      }

   if (panel.MaterialName.indexOf('ЛДСП')>=0 && panel.Thickness==16)
      {if (panel.ContourHeight>2730 || panel.ContourWidth>2730)
       {
         WarnMessage +=" ЛДСП16: "+panel.ArtPos;
       }
      }

   if (((panel.MaterialName.indexOf('ЛДСП')>=0)&&(panel.Thickness==32)))
      {if ((panel.ContourHeight>2700)||(panel.ContourWidth>2700))
       {
         WarnMessage +=" ЛДСП32: "+panel.ArtPos;
       }
      }

   if ((panel.MaterialName.indexOf('ДВП')>=0)&&(panel.Thickness==3))
      {if ((panel.ContourHeight>2740)||(panel.ContourWidth>2740))
       {
         WarnMessage +=" ДВП: "+panel.ArtPos;
       }
      }

   if (panel.MaterialName.indexOf('МДФ')>=0 && panel.Thickness==18.5)     // alvic
     { if (panel.ContourHeight>2740||panel.ContourWidth>2740)
       {
         WarnMessage +=" ALVIC: "+panel.ArtPos;
       }
      }
})

if (WarnMessage.length>1) 
	alert("Обнаружены панели которые превышают размер листа: "+WarnMessage);