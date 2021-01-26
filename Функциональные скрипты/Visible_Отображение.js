//////////////////////////////////////
//                                  //
//  version 1.0                     //
//  autor   Viktor                  //
//  mail    viktor-flash@mail.ru    //
//  vk.com/jobbm для Связи          //
//                                  //
//////////////////////////////////////

if (!Model.Selected){
    Model.forEach(function(panel) {
        var VisiblePanel = panel.UserProperty["Видимость"];
        if (!VisiblePanel){
            panel.Visible = true;
        }
    });
} else {
    Model.forEach(function(panel) {
        var myProp = panel.UserProperty["Видимость"];
        if (myProp == "Нет"){
            panel.Visible = false;        
        }
    });

}

UnSelectAll();