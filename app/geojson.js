var fs = require('fs');
var obj;
const depJSON = './geojson/peru_distrital_simple.geojson';
fs.readFile(depJSON, 'utf8', function (err, data) {
  if (err) console.error(err);
  obj = JSON.parse(data);
  console.log(obj.features.length);
  for (var i=0, len = obj.features.length; i< len;i++){
    let feature = obj.features[i];
    console.log(feature.properties.IDDIST)
  }
});