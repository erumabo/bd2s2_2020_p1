import express from 'express';

const PORT = 9000;
const app = express();

app.get('/',(r,s,n)=>{
  s.send('Hola Mundo');
})

app.listen(PORT,()=>{
  console.log('Server escuchando en el puerto ',PORT);
});
