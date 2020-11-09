import express from 'express';

import { generateGUIDcontroller } from '../controllers/generateGUID-Controller'

const app = express();

app.get("/generateGUID", (req, res,next) => {
//GET generate pin ? guid=string & pin=number
  try {
    const guid = generateGUIDcontroller(+(req.query['pin']||0), +(req.query['tiempo']||0)); 
    res.send({
      status: 200,
      guid: guid
    });
    //res.send(error)->json con el cod del error dentro
   } catch(err) {
     res.send({
       status: 500,
       error: err
     })
   }
});

export { app as generateGUIDRouter };
