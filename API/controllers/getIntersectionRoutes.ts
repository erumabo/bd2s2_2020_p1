import mongoDriver from './mongoDriver'

export function getIntersectionRoutes(cantonParameter : String){
    mongoDriver.getCoordenadas().find({canton : cantonParameter}, {lat: 1, long : 1, canton:1, datetime : 1, _id: 0}).then( (result : any) => {
        result = castLongAndLat(result);                                      //Aqui se encuentra el resultado del query, en la variable result
        console.log(result);
    }).catch((err:Error)=>console.error(err)); 
};

function castLongAndLat(coordenadas : any) {
    for(let i=0; i < coordenadas.length;i++){
        Object.defineProperties(coordenadas[i], {
            'getLat': { get: function() { return this.lat; } },
            'getLong' : { get: function() {return this.long} },
            'getCanton' : { get : function() { return this.canton}},
            'getDatetime' : { get : function() {return this.datetime}}
        });
        var lat =  parseFloat(coordenadas[i].getLat);
        var long = parseFloat(coordenadas[i].getLong);
        var canton = coordenadas[i].getCanton;
        var datetime = coordenadas[i].getDatetime;
        coordenadas.splice(i,i+1,{lat,long,canton,datetime});
    }
    return coordenadas;
    
}