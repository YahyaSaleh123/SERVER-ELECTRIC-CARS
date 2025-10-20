import {Router} from 'express'
import { getAllUsers , getUserById , createUser , updateUser , deleteUser,Login,addVehicle,AddCard,RemoveCard, AddHistory,DeleteVehicle,AddUserChat,UpdateToken,DeleteToken } from './user.controller.js';

const userRouter = Router();
userRouter
   .get('/',getAllUsers)
   .get('/profile/:id',getUserById)
   .post('/creditCard/:id',AddCard)
   .post('/search_history/:id',AddHistory)
   .post('/login',Login)
   .post('/',createUser)
   .post('/Vehicle/:id',addVehicle)
   .post('/chat/:id',AddUserChat)
   .put('/:id',updateUser)
   .put('/token/:id',UpdateToken)
   .delete('/token/:id',DeleteToken)
   .delete('/:id',deleteUser)
   .delete('/credit_card/:id',RemoveCard)
   .delete('/Vehicle/:id/:vehicle',DeleteVehicle)

   
   
export default userRouter;