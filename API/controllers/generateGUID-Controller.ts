import mongoDriver from './mongoDriver'
const Users = mongoDriver.getUsers();

function generateGUIDcontroller(pin : Number, tiempo_seg : Number) : string {
    try {
        const guid = ''+Date.now();
        const newUser = new Users({
            guid: guid,
            pin: pin,
            tiempo_seg: tiempo_seg,
            estado: "no confirmado"
        });

        newUser.save( (err: any, post: any) => {
            if (err)
            {
                console.error(err);
                throw err;
            }
        });
        return guid; 
    }
    catch(e)
    {
        console.error(e);
        throw e;
    }
}


export { generateGUIDcontroller };
