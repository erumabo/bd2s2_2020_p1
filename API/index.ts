import express from 'express';
import { validatePinRouter } from './endpoints/validatePin';
import { registerLocationRouter } from './endpoints/registerLocation';
import { generateGUIDRouter } from './endpoints/generateGUID';

const PORT = 9000;
const app = express();


app.use(express.json());
app.use(express.urlencoded());

app.use(generateGUIDRouter);
app.use(registerLocationRouter);
app.use(validatePinRouter);


app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
