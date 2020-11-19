import mongoDriver from './mongoDriver';
const Coordenadas = mongoDriver.getCoordenadas();

const cantones = ["Golfito"];

export default function testerController(guid : Number){
    registerLocationTester(guid);
}

function getCanton(){
    let canton = cantones[Math.trunc(Math.random()*cantones.length)];
    return canton;
}

function getLat(){
    // Latitude from 8.603 to 10.951
    // Min 8603  |  Max 10951
    // * 0.001
  // 8.361177
    const coord =     8261177;
    const min = coord - 20000,
          max = coord + 10000;
    let lat = Math.floor(Math.random() * (max - min + 1)) + min;
    lat = lat * 0.000001;
    return lat;
}

function getLong(){
    // Longitude from -85.585 to -82.946
    // Min 82946  |  Max 85585
    // * -0.001
    const coord =    8364831;
    const min = coord - 1400,
          max = coord +  600;
    let long = Math.floor(Math.random() * (max - min + 1)) + min;
    long = long * -0.00001;
    return long;
}

function getDatetime(){
    let start = new Date(2018, 0, 1);
    let end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

//Función que inserta en la collection el documento con la información dada.
function registerLocationTester(guid : Number){

    try {
        const lat = getLat();
        const long = getLong();
        const canton = getCanton();
        const date = getDatetime();

        const newLocation = new Coordenadas({
            guid: guid,
            lat : lat,
            long: long,
            canton: canton,
            datetime: date
        });

        newLocation.save( (err: any, post: any) => {
            if (err)
            {
                console.error("Error salvando ::", err);
                throw err;
            }
        });

    }
    catch(e)
    {
        console.error("Error creando documento ::", e);
        throw e;
    }
}
