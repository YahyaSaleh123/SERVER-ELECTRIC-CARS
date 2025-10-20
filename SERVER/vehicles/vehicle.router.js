import {Router} from 'express'
import {GetAllVehicles,CreateNewVehicle,DeleteVehicle} from './vehicle.controller.js'
const VehicleRouter = Router();

VehicleRouter
 .get('/',GetAllVehicles)
 .get('/:id',GetAllVehicles)
 .post('/',CreateNewVehicle)
 .delete('/:id',DeleteVehicle)

 export default VehicleRouter;
