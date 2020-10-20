const filename = 'C:\\f.fr3d'; // адрес до фрагмента
var furn = OpenFurniture(filename);
var obj = furn.Make(0, 0);
obj.Owner = Model.Temp;
if (obj && obj.List)
{
 obj.ElasticResize({
  x: 1000,
  y: 1500,
  z: 400
 })
 obj.PositionX = 100;
 obj.PositionY = 200;
 obj.PositionZ = 300;
}