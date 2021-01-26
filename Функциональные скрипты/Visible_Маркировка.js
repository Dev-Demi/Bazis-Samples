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
        panel.Visible = true;
    });
} else {
    Model.forEach(function(panel) {
        var myProp = panel.UserProperty["Видимость"];

        if ((panel.Selected) && (!myProp)){
            panel.UserProperty["Видимость"] = "Нет";
            panel.Visible = false;        
        }

        if ((panel.Selected) && (myProp=="Нет")){
            panel.UserProperty["Видимость"] =  undefined;
        }
    });
}

UnSelectAll();