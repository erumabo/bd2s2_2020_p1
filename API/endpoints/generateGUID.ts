import express from 'express';

import { generateGUIDcontroller } from '../controllers/generateGUID-Controller'

const app = express();

app.get("/generateGUID", async function(req, res) {
//GET generate pin ? guid=string & pin=number

    generateGUIDcontroller(<Number>req.query['pin'], <Number>req.query['tiempo_seg']); 
    res.send('guid: ' + res.query.guid);
    //res.send(error)->json con el cod del error dentro

});

export { app as registerLocationRouter };
