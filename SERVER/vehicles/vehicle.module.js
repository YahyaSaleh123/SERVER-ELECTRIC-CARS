import {AllVehicles,CreateNewVehicle,findSpecificVehicle,DeleteVehicle} from './vehicle.db.js'
export default class Vehicle
{
    constructor(manufacturer,model,type,year)
    {
    
        this.manufacturer=manufacturer;
        this.model=model;
        this.type=type;
        this.year=year
      
    }

    static async GetAllVehicles(id)
    {
        if(!id)
        {
            return await AllVehicles();
        }
        else
        return await findSpecificVehicle(id)
    }
    static async CreateNewVehicle(vehicle)
    {
     return await CreateNewVehicle(vehicle)
    }
    static async DeleteVehicle(id)
    {

return await DeleteVehicle(id)
    
    }


}