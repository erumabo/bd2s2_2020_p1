import { mongo } from 'mongoose';
import mongoDriver from './mongoDriver'

export function getClusterHoras(canton : any){
    
    console.log("Consultar Horarios");

    mongoDriver.getCoordenadas().aggregate([
        {
            $match : {
                "canton" : canton
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
        ]).exec(function(err : any, docs : any) {
            if (err) throw err;
                console.log(docs);
        });

}