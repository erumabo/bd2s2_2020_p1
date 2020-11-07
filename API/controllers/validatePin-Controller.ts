import mongoDriver from './mongoDriver'

function validatePinController(guid : string, pin : number){
    console.log("He recibido por GUID Y PIN: " + guid + "   "+pin );
    var conditions = { guid: guid }
      , update = { estado : true }
      , options = { multi: false };

    mongoDriver.getUsers().find({guid: guid})
      .then( (docs:any) => {
        if(pin === docs[0].pin)
          mongoDriver.getUsers().update(conditions,update,options,(err : any, numAffected : number) => {})
        const docs1 = mongoDriver.getUsers().find({guid: guid})
          .then((docs1:any)=> console.log(docs1));
      }).catch((err:Error)=>console.error(err));
}

export { validatePinController };
