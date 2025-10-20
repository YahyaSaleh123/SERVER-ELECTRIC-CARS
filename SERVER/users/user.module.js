import { findAllUsers, findSpecificUser, addUserToDB ,GetUserByEmail,DeleteUserFromDB,UpdateUserFromDB,AddVehicle,AddCard,RemoveCard,AddToHistory,RemoveVehicles,AddChat,UpdateToken} from "./user.db.js";
import bcrypt from "bcryptjs";

export  default class User
{
    constructor(firstname,lastname,email,password,admin=false,history=[],vehicles=[],card=null,chat=[],token=null)
 {
     
        this.firstname=firstname;
        this.lastname= lastname;
        this.email= email;
        this.password=password
        this.admin=admin;
        this.history=history
        this.vehicles=vehicles
        this.card=card
        this.chat=chat
        this.token=token
    }
       
    static async GetUserByEmail(email)
    {
        return await GetUserByEmail(email)
    }


    static async AllUsers(id) {
        try{
        if (!id) {
            return await findAllUsers();
        } else {
            
          return  await findSpecificUser(id);
        }
    }catch(error){
        throw error.message
    }

    }
    static async  addUser(user) {
        return await addUserToDB(user)
    }
    static async Login(email)
    {

        try {
            let user = await GetUserByEmail(email)
             
            
            if(!user)
                {
                    return null
                }

                return user

            
        } catch (error) {
            
        }
      

    }
    static async DeleteUser(id)
    {
    return await DeleteUserFromDB(id)  
    }
    static async  UpdateUser(id,user) 
    {
      return await  UpdateUserFromDB(id,user)
    }
    static async AddVehiclesToUser(car,id)
    {
        return await  AddVehicle(car,id)
    }
    static async AddCardToUser(card,id)
    {

    return await  AddCard(card,id)
    }
    static async RemoveCardFromUser(id)
    {
     return await RemoveCard(id)
    }
    static async AddStationToHistory(station,id)
    {
      return await AddToHistory(station,id)
    }
    static async RemoveVehicles(id,vehicle)
    {
     return await   RemoveVehicles(id,vehicle)
    }
    static async AddChat(chat,id)
    {
     return await  AddChat(chat,id)
    }
    static async UpdateToken(id,token)
    {
        return await UpdateToken(id,token)
    }

}
