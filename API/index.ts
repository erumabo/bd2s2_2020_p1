import express from 'express';
import confirmationPin from './controllers/mongoDriver';

const PORT = 9000;
const app = express();


app.use(express.json());
app.use(express.urlencoded());

app.get('/hola',(r,s,n)=>{
  s.send('Hola Mundo');
})

app.post('/validatePIN',(r,s,n)=>{
  confirmationPin(r.body.GUID,r.body.pin)
  s.send(true);
})

app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
