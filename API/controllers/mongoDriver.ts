const mongoose = require('mongoose');
const { Schema,Model } = mongoose;

export default class mongoDriver {
  private static instance:mongoDriver;
  private static Users:typeof Model;
  private static Coordenadas:typeof Model;

  private constructor() {
    this.connectMongo();
  }

  private connectMongo(){
    mongoose.connect('mongodb://localhost:27017/alertOnMe',         //cambiar direccion IP
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 2000

    }).catch((err:any)=>console.error("Error coneccion inicial",err));
    mongoose.connection.on('error', () => {
        console.log("No puedo conectar a mongo")
    });
    mongoose.connection.once('open', ()=> {
      mongoDriver.Users = mongoose.model('users',
        new Schema({
          guid : String,
          pin : Number,
          tiempo_seg : Number,
          estado : String
        })
      );
      mongoDriver.Coordenadas = mongoose.model('Coordenadas',
        new Schema({
            guid : String,
            lat: Float32Array,
            long: Float32Array,
            canton: String,
            datetime: { type: Date, default: Date.now }
        })
      );

    });
  }

  public static getInstance() {
    return this.instance?this.instance:(this.instance=new mongoDriver());
  }

  public static getUsers() {
    return this.Users?this.Users:((this.instance=new mongoDriver()),this.Users);
  }

  public static getCoordenadas() {
    return this.Coordenadas?this.Coordenadas:((this.instance=new mongoDriver()),this.Coordenadas);
  }

}

