import mongoDriver from './mongoDriver';

import geolocation from './geolocation';

const Coordenadas = mongoDriver.getCoordenadas();
export default function registerLocationController(lat : any, long : any, guid : any){
    
    getLocation(lat, long, guid);

}

    //Función para extraer con la API de gmaps el cantón con la latitud y longitud dada.
    function getLocation(lat : any, long : any, guid : any){
        geolocation( lat , long ).then((canton:string)=>{
          registerLocation(lat, long, guid, canton);
        }).catch(error => console.error(error));
    }

    //Función que inserta en la collection el documento con la información dada.
    function registerLocation(lat : any, long : any, guid : any, canton : any){


        try {

            const newLocation = new Coordenadas({

                guid: guid,

                lat : lat,

                long: long,

                canton: canton,

                datetime: new Date()

            });

            newLocation.save( (err: any, post: any) => {
                if (err)
                {
                    console.log(err);
                }
            });

        }
        catch(e)
        {
            console.log(e);
        }




    }





