BlockPos = 1;

function MakeObj(obj) {
    BlockToAssembly(obj);
}

function BlockToAssembly(obj) {
    Assembly = AddAssembly(BlockPos);
    Assembly.ArtPos = BlockPos;
    BlockPos++;
    for (var i = 0; i < obj.Count; i++) {
        objChild = obj.Objects[i];
        NewObj = AddCopy(objChild);
        NewObj.Owner = Assembly;
        NewObj.ReTransform(obj, Assembly);
    }
}

for (var i = 0; i < Model.Count; i++) {
    obj = Model.Objects[i];
    Undo.Changing(obj);
    if (obj instanceof TFurnBlock) MakeObj(obj);
}

for (var i = Model.Count - 1; i > -1; i--) {
    obj = Model.Objects[i];
    if (obj instanceof TFurnBlock) DeleteObject(obj);
}