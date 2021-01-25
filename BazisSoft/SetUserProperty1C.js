function AddUserProperty(obj) {
    obj.UserProperty['Склейка'] = 'Да';
    obj.UserProperty['Количество слоев'] = 5;
    obj.Selected = false;
}

function InToList(obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if (objChild.Selected) AddUserProperty(objChild);
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D))
            InToList(objChild);
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    if (obj.Selected)
        AddUserProperty(obj);
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D))
        InToList(obj);
}