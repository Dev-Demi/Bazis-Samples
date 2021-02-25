//////////////////////////////////////
//                                  //
//  version 1.1                     //
//  autor   Viktor                  //
//  mail    3d-b@mail.ru            //
//  связь   vk.com/3dbru            //
//                                  //
//////////////////////////////////////

Undo.RecursiveChanging(Model);

if (!Model.Selected){
    Model.forEach(function(obj) {
        var Ramka = obj instanceof TModelLimits;
        var Layer = obj instanceof TLayer3D;

        if (!Ramka && !Layer){
            obj.Visible = true;
        }
    });
} else {
    Model.forEach(function(obj) {
        var myProp = obj.UserProperty["Видимость"];
        var Layer = obj instanceof TLayer3D;

        if (obj.Selected && !myProp && !Layer){
            obj.UserProperty["Видимость"] = "Нет";
            obj.Visible = false;        
        }

        if (obj.Selected && myProp=="Нет" && !Layer){
            obj.UserProperty["Видимость"] =  undefined;
        }
    });
}

UnSelectAll();