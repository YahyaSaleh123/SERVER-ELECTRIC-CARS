import Vehicle from './vehicle.module.js'

export async function GetAllVehicles(req,res)
{
const {id} = req.params;
let vehicles = await Vehicle.GetAllVehicles(id);
if(!vehicles)
{
    return res.status(404).json({message:'Not Found'})
}
return res.status(200).json({message:'Found!',data: vehicles})
}

export async function CreateNewVehicle(req,res){
    const {manufacturer,model,type,year} = req.body;
    if(!manufacturer || !model || !type || !year)
    {
        return res.status(400).json({message:'Bad Request'})
    }
    const newVehicle = new Vehicle(manufacturer,model,type,year)
    await Vehicle.CreateNewVehicle(newVehicle)
    return res.status(201).json({message:'Created!',newVehicle})

}
export async function DeleteVehicle(req,res)
{
const{id} = req.params;
let vehicle = await Vehicle.GetAllVehicles(id);
if(!vehicle)
{
    return res.status(404).json({message:'Not Found'})
}
await Vehicle.DeleteVehicle(id)
return res.status(200).json({message:'Deleted!'})

}