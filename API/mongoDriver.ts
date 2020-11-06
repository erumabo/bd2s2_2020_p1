var mongoose = require('mongoose');
const { Schema } = mongoose;



export default function confirmationPIN(GUID : String, pin : number){
    console.log("He recibido por GUID Y PIN: " + GUID + "   "+pin );
    checkPIN(GUID,pin);
}

function connectMongo(){
    mongoose.connect('mongodb://localhost:27017/alertOnMe',         //cambiar direccion IP
                {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 2000

                });
    var db = mongoose.connection;

    db.on('error', () => {
        console.log("No puedo conectar a mongo")
        });
    db.once('open', ()=> {
        console.log("Conectado a mongo")
    });
}

async function checkPIN(guid : String , pin : number) {
    var conditions = { guid: guid }
  , update = { estado : true }
  , options = { multi: false };

    connectMongo();
  
    const users = mongoose.model('users',
                    new Schema({
                        guid : String,
                        pin : Number,
                        tiempo_seg : Number,
                        estado : Boolean
    }));

    const docs = await users.find({guid: guid});
    if(pin === docs[0].pin){
        await users.update(conditions,update,options,(err : any, numAffected : number) => {})
    }
    const docs1 = await users.find({guid: guid});
    console.log(docs1);
  }

  