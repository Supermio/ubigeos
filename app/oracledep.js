var fs = require('fs');

const oracledb = require('oracledb');
const dbConfig = require('./db/dbConfig.js');

var obj;
const depJSON = './geojson/peru_departamental_simple.geojson';

oracledb.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString
})
.then((connManager) => {
    console.log('Pool creado');	

    //let sql = 'insert into tempdist values(:id,:iddist,:iddpto,:idprov,:nomprov,:nombdev,:dcto,:ley,:fecha,:nom_cap,:shape_leng,:shape_area,:shape_le_1,:shape_ar_1,:area_minam,:geometry)';
    let sql = 'insert into tempdep(ubidep,geometry) ';
    sql += 'values(:ubidep,:geometry)';
    //let sql = 'insert into test values (:id)';
    let options = {
        autoCommit: true,
        bindDefs: {
            ubidep: { type: oracledb.STRING, maxSize: 2 }, //2001
            geometry: { type: oracledb.CLOB, maxSize: 80000} //2006
        }
    };

    fs.readFile(depJSON, 'utf8', function (err, data) {
        if (err) console.error(err);
        obj = JSON.parse(data);
        console.log(obj.features.length + ' ' +  new Date());
        let binds = [];        
        for (var i=0; i <= obj.features.length-1; i++ ) {
            let feature = obj.features[i];                
            let bind = {
                ubidep: feature.properties.FIRST_IDDP,
                geometry: JSON.stringify(feature.geometry)
            };            
            binds.push(bind);
        }
        
        connManager.getConnection()
        .then( (conn) => {
            conn.executeMany(sql,binds,options)
            .then((result) => {
                console.log('Resultado es: ' + JSON.stringify(result));
                conn.close();
                console.log('Conexiones: ' + connManager.connectionsInUse);
                console.log(obj.features.length + ' ' +  new Date());
            })
            .catch((error)=> {
                console.error('Insert Error: ' + error );
                conn.close();
                console.log('Conexiones: ' + connManager.connectionsInUse);
            })
        })
        .catch((error) => {
            console.error('Error Connection: ' + error);
        });
    });
})
.catch((error) => {
    console.error('Pool error: ' + error);
})
