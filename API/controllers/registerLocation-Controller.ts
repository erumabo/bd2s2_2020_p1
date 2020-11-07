const mongoose = require('mongoose');

import {Coordenadas} from './locationsScheme'

export class registerLocationController {

    private static instance: registerLocationController;
    private database : any;

    private constructor() {

        this.createConnection();

    }

    //Función para establecer la conexión a la base de datos.
    private createConnection(){

        try
        {
            mongoose.connect('mongodb://192.168.0.11:27017/alertOnMe', //Cambiar ip
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 2000
            });


            this.database = mongoose.connection;



            this.database.on('error', () => {
                console.log("Can't connect to Mongo Database")
            });


            this.database.once('open', ()=> {
                console.log("Connected to Mongo Database")
            });
        } catch (e)
        {
            console.log(e);
        }
    }

    //Función para extraer con la API de gmaps el cantón con la latitud y longitud dada.
    public getLocation(lat : any, long : any, guid : any){

        //Averiguar el canton y llamar a registerLocation()
        var canton : String;

        canton = "prueba";

        this.registerLocation(lat, long, guid, canton);
    }

    //Función que inserta en la collection el documento con la información dada.
    private registerLocation(lat : any, long : any, guid : any, canton : any){


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

    //Función que crea una instancia de la clase registerLocationController
    public static getInstance() : registerLocationController
    {
        if (!this.instance)
        {
            this.instance = new registerLocationController();
        }
        return this.instance;
    }

}



