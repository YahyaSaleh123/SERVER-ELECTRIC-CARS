import dotenv from "dotenv";
import express from "express";
import { connectToDB } from './DB/db.js';
import stationRouter from "./stations/station.router.js";
import userRouter from "./users/user.router.js";
import vehicleRouter from "./vehicles/vehicle.router.js";

dotenv.config();

const PORT=5500 || process.env.PORT;
const server = express();

server.use(express.json());

server.get('/', (req,res) =>{
    res.send("server is running and connected to DB")
});

server.use('/api/user',userRouter)
server.use('/api/station',stationRouter)
server.use('/api/vehicle',vehicleRouter)

connectToDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
