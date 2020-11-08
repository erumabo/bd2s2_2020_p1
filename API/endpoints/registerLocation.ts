import express from 'express';

import registerLocationController from '../controllers/registerLocation-Controller'

const app = express();

app.post("/registerLocation", (req, res, next) => { //POST registrar Localización ? lat=float & long=float & guid=string

    registerLocationController(req.query.lat, req.query.long, req.query.guid);

    res.send("Insertion successful.");

});

export { app as registerLocationRouter };
