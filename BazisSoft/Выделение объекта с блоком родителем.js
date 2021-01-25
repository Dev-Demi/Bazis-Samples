UnSelectAll();

for (var i = 0; i < 100; i++) {
    obj = GetObject('Укажите объект');
    if (obj != undefined) {
        objOwner = obj.Owner;
        if (objOwner instanceof TModel3D) {
            alert('Объект не входит ни в один блок');
        } else {
            objOwner.Selected = !objOwner.Selected;
        }
    } else
        break;
}
