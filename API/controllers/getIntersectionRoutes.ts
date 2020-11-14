import mongoDriver from './mongoDriver'

export function getIntersectionRoutes(cantonParameter : String){
    return mongoDriver.getCoordenadas().find({}, {lat: 1, long : 1, canton:1, guid: 1, _id: 0}).then( (result : any) => {
        //result = castLongAndLat(result);                                      //Aqui se encuentra el resultado del query, en la variable result
        result = result.map((c:any)=>{return{
          lat:parseFloat(c.lat),
          long:parseFloat(c.long),
          canton:c.canton,
          guid:c.guid
        }});
        return result; //console.log(result);
    }).catch((err:Error)=>console.error(err)); 
};

function castLongAndLat(coordenadas : any) {
    for(let i=0; i < coordenadas.length;i++){
        Object.defineProperties(coordenadas[i], {
            'getLat': { get: function() { return this.lat; } },
            'getLong' : { get: function() {return this.long} },
            'getCanton' : { get : function() { return this.canton}},
            'getGUID' : { get : function() {return this.guid}}
        });
        var lat =  parseFloat(coordenadas[i].getLat);
        var long = parseFloat(coordenadas[i].getLong);
        var canton = coordenadas[i].getCanton;
        var guid = coordenadas[i].getGUID;
        coordenadas.splice(i,i+1,{lat,long,canton,guid});
    }
    return coordenadas;
    
}
