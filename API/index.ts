import express from 'express';
import { validatePinRouter } from './endpoints/validatePin';
import { registerLocationRouter } from './endpoints/registerLocation';

const PORT = 9000;
const app = express();


app.use(express.json());
app.use(express.urlencoded());

app.use(validatePinRouter);
app.use(registerLocationRouter);

app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
