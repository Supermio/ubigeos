//const sqlite3 = require('sqlite3').verbose();
const timer = ms => new Promise( res => setTimeout(res, ms));

const Ubigeos = require('./model/ubigeo');

const Cloudant = require('@cloudant/cloudant');
const userCloudant = 'a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix';
const passCloudant = 'ba1b753332d777136876c7eb9a6c5af8218a0390fbe584aef0429b7e9b21a1b5';

var cloudant = Cloudant({account: userCloudant,password: passCloudant,url:'https://a6305753-8857-48ab-8ee2-f7dbf616d804-bluemix.cloudantnosqldb.appdomain.cloud'});
var ubi = cloudant.use('ubigeos');

var sqlDist = 'SELECT ubigeorniec, ubigeoinei,ubideprniec, UbiDepInei, Ubiprovrniec,UbiProvInei, ubipais, Departamento, Provincia, Distrito,poblacion, superficie,x,y FROM ubigeoglobal' ;
var sqlDep = 'SELECT DISTINCT ubideprniec,ubidepinei, ubipais,departamento FROM ubigeoglobal';
var sqlProv = 'SELECT DISTINCT ubiprovRNIEC,ubiPROVINEI,ubiDepRNIEC,ubipais,departamento,provincia FROM ubigeoglobal';


const ibmdb = require("ibm_db");

const connStr = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=pks49073;PWD=l2bp4gppn+jl59sf"
var Pool = require("ibm_db").Pool;
var pool = new Pool();

pool.open(connStr, function(err,connection){
    if (err){
        console.log('Error');
        console.log(err);
        return;
    }
    connection.query(sqlDist,['00'],function(err1,rows){
        if (err1) console.log(err1);
        else {
            console.log(new Date());
            var ubis = [];
            rows.forEach(row => {                
                let mUbigeo = new Ubigeos.Ubigeo(row.UBIPAIS,row.UBIGEORNIEC, row.UBIGEOINEI,row.UNIDEPRNIEC, row.UNIDEPINEI, row.UBIPROVRNIEC, row.UBIPROVINEI, row.DEPARTAMENTO, row.PROVINCIA,row.DISTRITO,Number(row.POBLACION),Number(row.SUPERFICIE),Number(row.X),Number(row.Y));                
                ubis.push(mUbigeo);
            });
            ubi.bulk({docs:ubis})
            .then((body)=>{
                console.log(new Date()+':Todo Ok :'+body.length);
            })
            .catch((err)=>{
                console.error('Error: '+err);
            })
        };
        connection.close(function(err2){
            if (err2) console.log(err2);
        });
    });
});
pool.open(connStr, function(err,connection){
    if (err){
        console.log('Error');
        console.log(err);
        return;
    }    
    connection.query(sqlDep,['00'],function(err1,rows){
        if (err1) console.log(err1);
        else {
            console.log(new Date());
            var ubis = [];
            rows.forEach(row => {                
                let mUbigeo = new Ubigeos.Departamento(row.UBIPAIS,row.UBIDEPRNIEC,row.UBIDEPINEI,row.DEPARTAMENTO);
                console.log(mUbigeo);
                ubis.push(mUbigeo);
            });
            ubi.bulk({docs:ubis})
            .then((body)=>{
                console.log(new Date()+':Todo Ok :'+body.length);
            })
            .catch((err)=>{
                console.error('Error: '+err);
            })
        };
        connection.close(function(err2){
            if (err2) console.log(err2);
        });
    });
});
pool.open(connStr, function(err,connection){
    if (err){
        console.log('Error');
        console.log(err);
        return;
    }    
    connection.query(sqlProv,['00'],function(err1,rows){
        if (err1) console.log(err1);
        else {
            console.log(new Date());
            var ubis = [];
            rows.forEach(row => {                          
                let mUbigeo = new Ubigeos.Provincia(row.UBIPAIS,row.UBIPROVRNIEC,row.UBIPROVINEI,row.UBIDEPRNIEC,row.UBIDEPINEI,row.DEPARTAMENTO,row.PROVINCIA);                
                ubis.push(mUbigeo);
            });
            ubi.bulk({docs:ubis})
            .then((body)=>{
                console.log(new Date()+':Todo Ok :'+body.length);
            })
            .catch((err)=>{
                console.error('Error: '+err);
            })
        };
        connection.close(function(err2){
            if (err2) console.log(err2);
        });
    });
});

/*let db = new sqlite3.Database('c:\\users\\Victor Manuel Pease\\Documents\\Ubigeos\\ubigeos.db',sqlite3.OPEN_READONLY, (err)=>{
    if (err){
        console.error(err.message);
    }
    console.log('Conectado a la base Ubigeos');
});

let sql = 'select * from ubigeos';
db.serialize(()=> {
    db.each(sql,(err,row)=> {
        if (err) {
            console.error(err.message);
        }
        let mUbigeo = new Ubigeos(row.id,row.cod_ubigeo_inei,row.cod_ubigeo_sunat,row.cod_ubigeo_reniec,row.desc_dep_inei,row.desc_prov_inei,row.desc_ubigeo_inei);
        console.log(JSON.stringify(mUbigeo));        
    });
});

db.all(sql, [],(err,rows)=>{
    if (err) {
        throw err;
    }
    rows.forEach((row)=> {
        console.log(row.id+ ' '+row.cod_ubigeo_inei);
    });
}); 

db.close((err)=>{
    if (err) {
        console.error(err.message);
    }
    console.log('Cerrar la conexión al sqlite');
});
*/
