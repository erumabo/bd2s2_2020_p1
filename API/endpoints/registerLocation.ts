import express from 'express';

import registerLocationController from '../controllers/registerLocation-Controller'

const app = express();

app.post("/registerLocation", (req, res, next) => { //POST registrar Localización ? lat=float & long=float & guid=string

    try {
      registerLocationController(req.query.lat, req.query.long, req.query.guid);

      res.send({
        status: 201,
        message: "Insertion successful."
      });
    } catch {
      res.send({
        status: 500,
        message: "Error al procesar request"
      });
    }

});

export { app as registerLocationRouter };
