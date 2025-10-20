
import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';
dotenv.config();





export async function findAllStations()
{
 let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('stations').find({}).toArray();

  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function findSpecificStation(id)
{
    let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('stations').findOne({_id:ObjectId.createFromHexString(id)});


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function addStation(station)
{
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('stations').insertOne(station);


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}
export async function deleteStation(id)
{
       let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('stations').deleteOne({_id:ObjectId.createFromHexString(id)});


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }

}