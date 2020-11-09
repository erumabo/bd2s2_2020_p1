import express from 'express';

import { validatePinController } from '../controllers/validatePin-Controller'

const app = express();

app.put("/validatePin", (req, res, next) => { //PUT validar pin ? guid=string body.pin=number
  console.log(`Validar PIN para ${req.query['guid']} -> ${req.body['pin']}`);
    res.set('Access-Control-Allow-Origin','*');
    validatePinController(<string>req.query['guid'], <number>req.body['pin']);
    res.status(202).send({
      message: "Request procesado"
    });
});

export { app as validatePinRouter };
