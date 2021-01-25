function AddUserProperty(obj) {
    if (obj.AsPanel) {
        Dl = 0;
        for (var i = 0; i < obj.Contour.Count; i++) {
            ElCont = obj.Contour[i];
            if ((ElCont.ElType == 2) || (ElCont.ElType == 3)) {
                Dl = Dl + ElCont.ObjLength();
                }
        }
        if (Dl > 0) {
            obj.UserProperty['Длина дуг и окр'] = Dl;
//            obj.Selected = false;
        }
    }
}

function InToList(obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
//        if (objChild.Selected)
            AddUserProperty(objChild);
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D))
            InToList(objChild);
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
//    if (obj.Selected)
        AddUserProperty(obj);
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D))
        InToList(obj);
}