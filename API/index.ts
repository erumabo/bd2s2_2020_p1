import express from 'express';
const handles = require('express-handlebars');

import { validatePinRouter } from './endpoints/validatePin';
import { registerLocationRouter } from './endpoints/registerLocation';
import { generateGUIDRouter } from './endpoints/generateGUID';
import { intersectionRoutes } from './endpoints/intersectionRoutes'
import { getClusterHorarios } from './endpoints/getClusterHorarios'
import { testerRouter } from './endpoints/tester'

const PORT = 9000;
const app = express();

app.engine('handlebars',handles());
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded());

app.use(generateGUIDRouter);
app.use(registerLocationRouter);
app.use(validatePinRouter);
app.use(intersectionRoutes);
app.use(getClusterHorarios);
app.use(testerRouter);

app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
