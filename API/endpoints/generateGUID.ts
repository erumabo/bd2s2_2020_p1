import express from 'express';

import { generateGUIDcontroller } from '../controllers/generateGUID-Controller'

const app = express();

app.get("/generateGUID", (req, res,next) => {
//GET generate pin ? guid=string & pin=number
  console.log(`Generar nuevo GUID`);
  res.set('Access-Control-Allow-Origin','*');
  try {
    const guid = generateGUIDcontroller(<Number>(req.query['pin']||0), <Number>(req.query['tiempo']||0)); 
    res.status(200).send({
      guid: guid
    });
   } catch(err) {
     res.status(500).send({
       error: err
     })
   }
});

export { app as generateGUIDRouter };
