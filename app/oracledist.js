var fs = require('fs');

const oracledb = require('oracledb');
const dbConfig = require('./db/dbConfig.js');

var obj;
const depJSON = './geojson/peru_distrital_simple.geojson';

oracledb.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString
})
.then((connManager) => {
    console.log('Pool creado');	

    //let sql = 'insert into tempdist values(:id,:iddist,:iddpto,:idprov,:nomprov,:nombdev,:dcto,:ley,:fecha,:nom_cap,:shape_leng,:shape_area,:shape_le_1,:shape_ar_1,:area_minam,:geometry)';
    let sql = 'insert into tempdist(id,iddist,iddpto,idprov,nombdist,nombprov,nombdev,dcto,ley,fecha,nom_cap,shape_leng,shape_area,shape_le_1,shape_ar_1,area_minam,geometry) ';
    sql += 'values(:id,:iddist,:iddpto,:idprov,:nombdist,:nombprov,:nombdev,:dcto,:ley,:fecha,:nom_cap,:shape_leng,:shape_area,:shape_le_1,:shape_ar_1,:area_minam,:geometry)';
    //let sql = 'insert into test values (:id)';
    let options = {
        autoCommit: true
    };

    fs.readFile(depJSON, 'utf8', function (err, data) {
        if (err) console.error(err);
        obj = JSON.parse(data);
        console.log(obj.features.length + ' ' +  new Date());        
        for (var i=0, len = obj.features.length ; i < len; i++){
          let feature = obj.features[i];
          /*let binds = {
              id: { val: feature.properties.OBJECTID }
          };*/
          let binds = {
              id: { val: feature.properties.OBJECTID },
              iddist: { val: feature.properties.IDDIST },
              iddpto: { val: feature.properties.IDDPTO }, 
              idprov: { val: feature.properties.IDPROV }, 
              nombdist: { val: feature.properties.NOMBDIST }, 
              nombprov: { val: feature.properties.NOMBPROV }, 
              nombdev: { val: feature.properties.NOMBDEP } , 
              dcto:  { val: feature.properties.DCTO }, 
              ley: { val: feature.properties.LEY },
              fecha: { val: feature.properties.FECHA }, 
              nom_cap: { val: feature.properties.NOM_CAP } , 
              shape_leng: { val: feature.properties.SHAPE_LENG}, 
              shape_area: { val: feature.properties.SHAPE_AREA }, 
              shape_le_1: { val: feature.properties.SHAPE_LE_1 }, 
              shape_ar_1: { val: feature.properties.SHAPE_AR_1 }, 
              area_minam: { val: feature.properties.AREA_MINAM }, 
              geometry: { val: JSON.stringify(feature.geometry) }
            };
            console.log('El binds: '+ JSON.stringify(binds));
            connManager.getConnection()
            .then( (conn) => {
                conn.execute(sql,binds,options)
                .then((result) => {
                    console.log('Resultado es: ' + JSON.stringify(result ));
                    conn.close();
                    console.log('Conexiones: ' + connManager.connectionsInUse);
                    console.log(obj.features.length + ' ' +  new Date());        
                })
                .catch((error)=> {
                    console.error('Insert Error: ' + error + ' : '+ binds );
                    conn.close();
                    console.log('Conexiones: ' + connManager.connectionsInUse);
                })
            })
            .catch((error) => {
                console.error('Error Connection: ' + error);
            });
        }
    })
})
.catch((error) => {
    console.error('Pool error: ' + error);
})
