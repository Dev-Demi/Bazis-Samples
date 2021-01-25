function AddNamePanel(panel) {
    if (panel.ArtPos.indexOf('(') < 0)
        panel.ArtPos = panel.ArtPos + ' (' +
        panel.Designation + //Добавление обозначения
//        ' ' + panel.Contour.Width + 'x' + panel.Contour.Height + //Добавление размера
        ')';
}

function AddNameBlock(block) {
    if ((block.ArtPos.indexOf('(') < 0) && (block.ArtPos.length > 0))
        block.ArtPos = block.ArtPos + ' (' +
        block.Designation + //Добавление обозначения
//        ' ' + block.GSize.x.toFixed(1) + ' x ' + block.GSize.y.toFixed(1) + ' x ' + block.GSize.z.toFixed(1) + //Добавление размера
        ')';
}

function InToList(obj) {
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        if ((objChild instanceof TFurnBlock) || (objChild instanceof TLayer3D)) {
            if (objChild instanceof TFurnBlock) AddNameBlock(objChild);
            InToList(objChild);
        }
        if (obj[i] instanceof TFurnPanel) {
            AddNamePanel(obj[i].AsPanel);
        }
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    if ((obj instanceof TFurnBlock) || (obj instanceof TLayer3D)) {
        if (obj instanceof TFurnBlock) AddNameBlock(obj);
        InToList(obj);
    }
    if (obj instanceof TFurnPanel) {
        AddNamePanel(obj.AsPanel);
    }
}
