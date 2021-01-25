Log = false;

function SelectFasteners(c) {
    var List = c;
    for (var i = 0; i < List.Count; i++) {
        obj = List.Objects[i];
        if (obj instanceof TFastener) {
            if (!Log) {
                Vis = !obj.Visible;
                Log = true
            }
            obj.Visible = Vis;
        } else
        if (obj instanceof TFurnBlock) SelectFasteners(obj);
        if (obj instanceof TLayer3D) SelectFasteners(obj);
    }
}

SelectFasteners(Model);