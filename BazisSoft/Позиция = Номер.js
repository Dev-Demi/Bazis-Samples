Poz = 1;

function MakeObj(obj) {
    if (obj.List) {
        for (var i = 0; i < obj.Count; i++) {
            objv = obj.Objects[i];
            if (obj.List) MakeObj(objv);
        }
    }
    if (obj instanceof TFurnPanel) {
        obj.ArtPos = Poz;
        Poz++;
    }
    if (obj instanceof TFastener) {
        obj.ArtPos = Poz;
        Poz++;
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    MakeObj(obj);
}