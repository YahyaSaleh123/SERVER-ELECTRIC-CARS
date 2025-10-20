import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from 'mongodb';


dotenv.config();




export async function findAllUsers() {

  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING);
    const db = client.db(process.env.DB_NAME);
    return await db.collection('users').find({}).toArray();

  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }

}

export async function findSpecificUser(id) {


  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
   let user= await db.collection('users').findOne({ _id: ObjectId.createFromHexString(id) });
 
   if(user.card)
    {

      let card= jwt.verify(user.card,process.env.SECRET_KEY)
      user.card=card
     
    }
    return user

  } catch (error) {
    console.log(error.message)
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }



}
export async function addUserToDB(user) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    const result = await db.collection('users').insertOne(user);
   
    return result.insertedId.toString()
    

  } catch (error) {
    throw error.message
  } finally {
    if (client) {
      client.close()

    }
  }


}

export async function UpdateUserFromDB(id, user) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: user });


  } catch (error) {
    throw error.message
  } finally {
    if (client) {
      client.close()

    }
  }


}
export async function DeleteUserFromDB(id) {

  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').deleteOne({ _id: ObjectId.createFromHexString(id) });


  } catch (error) {
    throw error.message
  } finally {
    if (client) {
      client.close()

    }
  }

}
export async function GetUserByEmail(email) {

  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').findOne({ email });


  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }


}
export async function AddVehicle(car, id) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $push: { vehicles: car } });



  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}
export async function AddCard(card, id) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { card: card } });
  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }


}
export async function RemoveCard(id) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { card: null } });
  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function AddToHistory(station, id) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $push: { history: station } });



  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}

export async function RemoveVehicles(id, vehicle) {
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $pull: { vehicles: { number: vehicle } } });



  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }

}
export async function AddChat(chat,id)
{
  let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $push: { chat: chat } });

  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }


}
export async function UpdateToken(id,token)
{
   let client = null;
  try {
    client = await MongoClient.connect(process.env.CONNECTION_STRING)
    const db = client.db(process.env.DB_NAME)
    return await db.collection('users').updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: { token: token } });

  } catch (error) {
    return error.message
  } finally {
    if (client) {
      client.close()

    }
  }
}