import Station from './station.module.js';
 

export async function getAllStations(req, res) {
    let stations = await Station.AllStations();
    if (!stations) {
        return res.status(404).json({ message: 'Not Found' ,stations:[]})
    }
    return res.status(200).json({ message: 'Found!',stations: stations })
}

export async function getSpecificStation(req, res) 
{
    const {id} = req.params;
    let station = await Station.AllStations(id);
    if (!station) {
        return res.status(404).json({ message: 'Not Found',station:null })
    }
    return res.status(200).json({ message: 'Found!',station: station })

}

export async function addStation(req, res)
{
    const {stationName,address,city,latitude,longitude,operator,connector,power,speed} = req.body
    if(!stationName || !address || !city || !latitude || !longitude || !operator || !connector || !power || !speed)
    {
        return res.status(400).json({ message: "missing data" })
    }
    

    const stationObj = new Station(stationName,address,city,latitude,longitude,operator,connector,power,speed)
  if(await Station.addStation(stationObj))
    {
        return res.status(200).json({ message: 'Added!' })
    }
}


export async function deleteStation(req, res)
{
    const {id} = req.params;
    let station = await Station.AllStations(id);
    if(!station)
        {
            return res.status(404).json({ message: 'Not Found' })

        }
        await Station.deleteStation(id);
        return res.status(200).json({ message: 'Deleted!' })
    

}   
