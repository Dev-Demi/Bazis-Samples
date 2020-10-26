var fs = require('fs');
var path = require('path')
var dir = 'f:\\3\\'; // путь к папке в которой будем искать файлы *.b3d

var files = fs.readdirSync(dir);
for (var i in files){
    var ext = path.extname(dir + '\\' + files[i])
    var fname = path.parse(dir + '\\' + files[i]).name
    
    if (ext=='.b3d')
    {
        var name = dir + files[i];
        Action.LoadModel(name);
       // 
       // Здесь делаем что хотим с моделью
       //
        Action.SaveModel(dir+fname+'_new'+'.b3d');
    }
}