import {Router} from 'express'
import { getAllStations , getSpecificStation , addStation  , deleteStation } from './station.controller.js';


const stationRouter = Router();
stationRouter
 .get('/',getAllStations)
 .get('/:id',getSpecificStation)
 .post('/',addStation)
 .delete('/:id',deleteStation)

   
   
export default stationRouter;