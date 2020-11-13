import express from 'express';

import { getIntersectionRoutes } from '../controllers/getIntersectionRoutes'

const app = express();

app.get('/getIntersectionsRoutes', (req,res,next) => {
    console.log(`He obtenido el canton ${req.query['canton']}`)
    getIntersectionRoutes(""+req.query['canton']);
    res.send("Query succesfly");
})




export { app as intersectionRoutes}; 