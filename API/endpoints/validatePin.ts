import express from 'express';

import { validatePinController } from '../controllers/validatePin-Controller'

const app = express();

app.put("/validatePin", (req, res, next) => { //PUT validar pin ? guid=string body.pin=number
    validatePinController(<string>req.query['guid'], <number>req.body['pin']);
    res.send(true);
});

export { app as validatePinRouter };
