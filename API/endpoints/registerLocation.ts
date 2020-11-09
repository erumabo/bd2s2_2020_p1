import express from 'express';

import registerLocationController from '../controllers/registerLocation-Controller'

const app = express();

app.post("/registerLocation", (req, res, next) => { //POST registrar Localización ? lat=float & long=float & guid=string
  console.log(`Registrar Locacion para GUID::${req.query['guid']} -> (${req.query['lat']},${req.query['long']})`);

    res.set('Access-Control-Allow-Origin','*');
    try {
      registerLocationController(req.query.lat, req.query.long, req.query.guid);
      res.status(201).send({
        message: "Insertion successful."
      });
    } catch {
      res.status(500).send({
        message: "Error al procesar request"
      });
    }

});

export { app as registerLocationRouter };
