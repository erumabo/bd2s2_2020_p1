import express from 'express';

import { getClusterHoras } from '../controllers/getClusterHoras-Controller'


const app = express();

app.get("/getClustersHorarios", (req, res,next) => {
//GET generate pin ? guid=string & pin=number
  console.log(`Consultar Clusters de Horarios X Cantón`);

  //res.set('Access-Control-Allow-Origin','*'); --> No se si se ocupa

  try {

    const horas = getClusterHoras(""+req.query['canton']); 

    res.status(200).send({
        message: "Insertion successful."
    });
   } catch(err) {
     res.status(500).send({
        message: "Error al procesar request"
     })
   }
});

export { app as getClusterHorarios };




/* Por ahora hace la consulta dándole un cantón por específico. Lo mejor sería hacerle de una vez la consulta de todos. 

   No pude hacer pruebas correctas porque por ahora solo hemos hecho inserción de coordenadas en la misma hora y día de la semana para los cantones. 
*/