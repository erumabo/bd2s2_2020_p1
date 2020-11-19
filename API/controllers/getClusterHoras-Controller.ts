//import { mongo } from 'mongoose';
import mongoDriver from './mongoDriver'

export function getClusterHoras(canton : any){
    
    console.log("Consultar Horarios");

    return mongoDriver.getCoordenadas().aggregate([
        {
            $match : {
                "canton" : canton,
                "guid" : {"$ne" : 1}
            }
        },
        {
            $project : {
                "canton"  : "$canton",
                "dia"  : { $dayOfWeek : "$datetime"  },
                "hora"  : { $hour : "$datetime"   }
            }
        },
        {
            $group : {

            "_id" : { "canton": "$canton", "dia": "$dia", "hora" : "$hora" },
            "total" : {$sum : 1}
            }
        },
        {
            $sort : {"total" : -1}
        }
        ])
        .then((docs:any)=>{
          //console.log(docs)
          return docs;
        })
        .catch((err:any)=>console.error(err));

}
