import mongoDriver from './mongoDriver';
const Coordenadas = mongoDriver.getCoordenadas();

const cantones = ["Coronado", "Cartago","Moravia"];

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
    let lat = Math.floor(Math.random() * (10951 - 8603 + 1)) + 8603;
    lat = lat * 0.001;
    return lat;
}

function getLong(){
    // Longitude from -85.585 to -82.946
    // Min 82946  |  Max 85585
    // * -0.001
    let long = Math.floor(Math.random() * (85585 - 82946 + 1)) + 82946;
    long = long * -0.001;
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
