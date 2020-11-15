import express from 'express';

import { getIntersectionRoutes } from '../controllers/getIntersectionRoutes';
import { visualMap } from '../controllers/visuals';

const app = express();

app.get('/getIntersectionsRoutes', (req,res,next) => {
    console.log(`He obtenido el canton ${req.query['canton']}`)
    //res.render("index",{script : visualMap([])})
    getIntersectionRoutes(""+req.query['canton'])
      .then((locations:any)=> {
        res.render("index",{svg : visualMap(locations)})
      });
    //res.send("Query succesfly");
})




export { app as intersectionRoutes}; 
