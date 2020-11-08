import mongoDriver from './mongoDriver'
const Users = mongoDriver.getUsers();
import { User } from '../library/user';


function generateGUIDcontroller(pin : Number, tiempo_seg : Number){
    try {
        const newUser = new Users
        ({
            guid: Date.now(),
            pin: Number,
            tiempo_seg: tiempo_seg,
            estado: "no confirmado"
        });

        newUser.save( (err: any, post: any) => {
            if (err)
            {
                console.log(err);
                //crear un json pata enviarle el error
                //estado
                //cod del error
            }
        });
        
    }
    catch(e)
    {
        console.log(e);
    }
}


export { generateGUIDcontroller };