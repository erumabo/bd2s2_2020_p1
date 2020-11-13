import express from 'express';
const handles = require('express-handlebars');
import { visualMap } from './controllers/visuals';

import { validatePinRouter } from './endpoints/validatePin';
import { registerLocationRouter } from './endpoints/registerLocation';
import { generateGUIDRouter } from './endpoints/generateGUID';

const PORT = 9000;
const app = express();

app.engine('handlebars',handles());
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded());

app.use(generateGUIDRouter);
app.use(registerLocationRouter);
app.use(validatePinRouter);

app.get('/visual',(req,res,next)=>{
  res.render('index',{svg: visualMap([])});
})

app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
