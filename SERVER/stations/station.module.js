
import { findAllStations, findSpecificStation ,addStation,deleteStation} from './station.db.js';

export default class Station
{
    constructor(stationName,address,city,latitude,longitude,operator,connector,power,speed)
    {
      
        this.stationName=stationName;
        this.address=address;
        this.city=city;
        this.latitude=latitude;
        this.longitude=longitude;
        this.operator=operator;
        this.connector=connector;
        this.power=power;
        this.speed=speed
    }

    static async AllStations(id) {
         if (!id) {
            return await findAllStations();
        } else {
            return await findSpecificStation(id);
        }
    }

    static async addStation(station)
    {
        return await addStation(station)
    
    }
    static async deleteStation(id)
    {
        return await deleteStation(id)
    
    }



}