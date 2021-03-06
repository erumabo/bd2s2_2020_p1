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
          guid :  String,
          lat:    Number,
          long:   Number,
          canton: String,
          datetime: { type: Date, default: Date.now }
      })
    );

    mongoose.connect('mongodb://172.22.135.232:27018,172.22.124.8:27018',         //cambiar direccion IP
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 2000,
      dbName: "alertme"
    }).then(()=>{
      console.log("Connection Succesfull");
    }).catch((err:Error) =>{
    console.error("Error coneccion inicial",err)
    });

    mongoose.connection.on('error', () => {
        console.log("No puedo conectar a mongo")
    });
  
  }

  public static getInstance() {
    return this.instance?this.instance:(this.instance=new mongoDriver());
  }

  public static getUsers() {
    if(!this.Users) this.instance=new mongoDriver()
    return this.Users;
  }

  public static getCoordenadas() {
    if(!this.Coordenadas) this.instance=new mongoDriver()
    return this.Coordenadas;
  }

}
