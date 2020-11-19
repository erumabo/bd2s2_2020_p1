import express from 'express';
import testerController from '../controllers/tester-Controller'

const app = express();

app.post("/tester", (req, res, next) => { 
    //POST tester ? guid = 1
    console.log(`Registrar Locacion Tester para GUID::${req.query['guid']}`);
  
      res.set('Access-Control-Allow-Origin','*');
      try {
        testerController(+(req.query.guid||0));
        res.status(201).send({
          message: "Insertion successful."
        });
      } catch {
        res.status(500).send({
          message: "Error al procesar request."
        });
      }
  });

export { app as testerRouter };
