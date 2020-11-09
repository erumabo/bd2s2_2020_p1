import express from 'express';

import { validatePinController } from '../controllers/validatePin-Controller'

const app = express();

app.get("/validatePin", (req, res, next) => { //PUT validar pin ? guid=string & pin=number
    console.log(`Validar PIN para ${req.query['guid']} -> ${req.query['pin']}`);
    validatePinController(<string>req.query['guid'], +(req.query['pin']||0));
    res.set('Access-Control-Allow-Origin','*');
    res.status(202).send({
      message: "Request procesado"
    });
});

export { app as validatePinRouter };
