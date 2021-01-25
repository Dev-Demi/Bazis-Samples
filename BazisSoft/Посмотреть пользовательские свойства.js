var SpUserProperty = [];

Model.forEachPanel(function (panel) {
    for (var i = 0; i < panel.UserPropCount; i++) {
        var sign = 'Поз.' + panel.ArtPos + ' ' +
                    panel.Name + ' ' +
                    panel.UserPropertyName[i] + ' = "' + ExtractMatName(panel.UserProperty[i]) + '"';
        if (SpUserProperty.indexOf(sign) < 0) {
            SpUserProperty.push(sign);
        }
    }
}
)

SpUserProperty.sort();

if (SpUserProperty.length == 0) alert('Пользовательских свойств нет.')
    else system.askWriteTextFile('txt', SpUserProperty.join('\n'));

//if (SpUserProperty.length != 0) system.askWriteTextFile('txt', SpUserProperty.join('\n'));
