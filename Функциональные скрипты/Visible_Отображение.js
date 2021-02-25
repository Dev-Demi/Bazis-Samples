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
        var VisiblePanel = obj.UserProperty["Видимость"];
        var Ramka = obj instanceof TModelLimits;
        var Sloy = obj instanceof TLayer3D;

        if (!VisiblePanel && !Ramka && !Sloy){
            obj.Visible = true;
        }
    });
} else {
    Model.forEach(function(obj) {
        var myProp = obj.UserProperty["Видимость"];
        if (myProp == "Нет"){
            obj.Visible = false;        
        }
    });
}

Model.forEach(function (obj) {
    if (obj.Name == "Размер"){
        obj.Visible = false;
    }
}
);

UnSelectAll();