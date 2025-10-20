import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';
dotenv.config();


export async function AllVehicles()
{
    let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('vehicles').find({}).toArray();

  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
    
}
export async function findSpecificVehicle(id)
{
   let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('vehicles').findOne({_id:ObjectId.createFromHexString(id)});


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function CreateNewVehicle(vehicle)
{
let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('vehicles').insertOne(vehicle);


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function DeleteVehicle(id)
{
   let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('vehicles').deleteOne({_id:ObjectId.createFromHexString(id)});


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}