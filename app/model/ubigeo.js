class Ubigeo {
    /*constructor() {
        this._id = 0
    }*/
    constructor(pUbiPais,pUbigeo, pUbiInei,pUbiDep, pUbiDepInei, pUbiProv, pUbiProvInei, pDepartamento, pProvincia, pDistrito,pPoblacion,pSuperficie,pX,pY) {
        this._id = 'dist-' + pUbiPais + pUbigeo;
        this.ubiPais = pUbiPais;
        this.type = 'distrito';
        this.ubigeo = pUbigeo;
        this.ubiInei = pUbiInei;        
        this.ubiDep = pUbiDep;
        this.ubiDepInei = pUbiDepInei;        
        this.ubiProv = pUbiProv;
        this.ubiProvInei = pUbiProvInei;        
        this.departamento = pDepartamento;
        this.provincia = pProvincia;
        this.distrito = pDistrito;
        this.poblacion = pPoblacion;
        this.superficie = pSuperficie+0;
        this.location = {
            "type": "Feature",
            "geometry":{
                "type":"Point",
                "coordinates": [pX,pY]
            },
            "properties": {
                "name": pDistrito,
                "category": "Distrito"
            }
        };
    }
};

class Departamento {
    constructor(pUbiPais,pUbigeo, pUbiInei, pDepartamento){
        this._id = 'dep-'+ pUbiPais + pUbigeo;
        this.ubiPais = pUbiPais;
        this.type = 'departamento';
        this.ubigeo = pUbigeo;
        this.ubiInei = pUbiInei;        
        this.departamento = pDepartamento;
    }
};

class Provincia {
    constructor(pUbiPais,pUbigeo, pUbiInei, pUbiDep, pUbiDepInei, pDepartamento, pProvincia){
        this._id = 'prov-' + pUbiPais + pUbigeo;
        this.ubiPais = pUbiPais;
        this.type = 'provincia';
        this.ubigeo = pUbigeo;
        this.ubiInei = pUbiInei;        
        this.ubiDep = pUbiDep;
        this.ubiDepInei = pUbiDepInei;        
        this.departamento = pDepartamento;
        this.provincia = pProvincia;
    }
};

module.exports = {
    Ubigeo : Ubigeo,
    Provincia : Provincia,
    Departamento : Departamento
}
