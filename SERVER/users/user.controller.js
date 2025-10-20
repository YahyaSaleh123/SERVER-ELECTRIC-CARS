import User from "./user.module.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();


export async function getUserById(req, res) {
    let { id } = req.params

    let user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'Not Found',data:null })
    }
    return res.status(200).json({ message: 'Found!',data: user })
}



export async function getAllUsers(req, res) {
    let users = await User.AllUsers();
    if (!users) {
        return res.status(404).json({ message: 'Not Found' })
    }
    return res.status(200).json({ message: 'Found!',data: users })
}



export async function createUser(req, res) {

 if ( !req.body.firstname || !req.body.email || !req.body.lastname || !req.body.password) {
        return res.status(400).json({ message: "missing data" })
    }

    let user = await User.GetUserByEmail(req.body.email);
    if (user) {
        return res.status(404).json({ message: 'Email Already Exist' })
    }

   
   
    const userObj = new User( req.body.firstname, req.body.lastname, req.body.email,  bcrypt.hashSync(req.body.password,15) )
   let id= await User.addUser(userObj)
    return res.status(201).json({ message: "successfully added",data: id })
}



export async function updateUser(req, res) {
    const { firstname, lastname, email, password ,oldPassword} = req.body;
    const { id } = req.params;
    const user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'Not Found' })
    }
    if(oldPassword != null)
        {
         if(bcrypt.compareSync(oldPassword, user.password))
         {
             user.password=  bcrypt.hashSync(password,15);
         }else
            {
                return res.status(401).json({ message: 'Invalid Old Password' })
            }
         
        }
    if (!id || !firstname || !email || !lastname ) {
        return res.status(400).json({ message: "missing data" })
    }
    const userObj = new User(firstname, lastname, email, user.password, user.admin, user.history, user.vehicles, user.card ,user.chat,user.token)
   await User.UpdateUser(id,userObj)
    res.status(200).json({ message: firstname + ' Has Ben Updated successfully' })
}



export async function deleteUser(req, res) {
    let user = await User.AllUsers(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'Not Found' })
    }
   await User.DeleteUser(req.params.id)
    res.status(200).json({ message: user.firstname + ' Has Ben Deleted successfully' })
}

export async function Login(req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.Login(email)
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                delete user.password
                res.status(200).json({ message: 'Login successfully',data: user })
            }
            else {
                res.status(401).json({ message: 'Invalid Password' })
            }
        }
        else {
            res.status(401).json({ message: 'Invalid Email' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function addVehicle(req, res) {
    const { id } = req.params
    const { number, manufacturer, model, type, year } = req.body
    if (!number || !manufacturer || !model || !type || !year) {
        return res.status(400).json({ message: "missing data" })
    }
    const user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'Not Found' })
    }
    let flag = true
    user.vehicles.map((i) => { if (i.number === number) { flag = false } })
    if (flag) {
        const car = { number: number, manufacturer: manufacturer, model: model, type: type, year: year }
        await User.AddVehiclesToUser(car, id)
        return res.status(200).json({ message: 'Car Has Ben Added successfully' })
    } else {
        return res.status(404).json({ message: 'Car Number Already Exist' })
    }
    
}
export async function AddCard(req, res) {
    const { id } = req.params
    const { cardNumber, holder, expiry, cvv } = req.body
    if (!id||!cardNumber || !holder || !expiry || !cvv) {
        return res.status(400).json({ message: "missing data" })
    }
    let user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
    }
    let credit_card = { cardNumber: cardNumber, holder: holder, expiry: expiry, cvv: cvv }
    let cardToken= jwt.sign(credit_card, process.env.SECRET_KEY); 
    await User.AddCardToUser(cardToken, id);
    return res.status(200).json({ message: 'Card Has Ben Added successfully' })
}
export async function RemoveCard(req, res) {
    const { id } = req.params;
    let user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
    }
    await User.RemoveCardFromUser(id)
     return res.status(200).json({ message: 'Card Has Ben Removed successfully' })

}
export async function AddHistory(req, res) {
    const { id } = req.params
    const { stationName, address, city, operator, connector, power, speed ,latitude,longitude} = req.body
    let user = await User.AllUsers(id);
    if (!user) {
        return res.status(404).json({ message: 'User Not Found' })
    }
    if (!stationName || !address || !city || !operator || !connector || !power || !speed || !latitude || !longitude) {
        return res.status(400).json({ message: "missing data" })
    }
    const station={stationName:stationName,address:address,city:city,operator:operator,connector:connector,power:power,speed:speed ,latitude:latitude,longitude:longitude}
    await User.AddStationToHistory(station,id)
    return res.status(200).json({ message: 'Station Has Ben Added successfully' })


}
export async function DeleteVehicle(req,res)
{
    const {id,vehicle}=req.params
    let user = await User.AllUsers(id);
    if(!user)
        {
          return res.status(404).json({ message: 'User Not Found' })

        }
       
        let flag =false
     user.vehicles.map((v) =>{if(v.number === vehicle){flag=true}})
        if(!flag)
            {
          return res.status(404).json({ message: 'Vehicle Not Found' })

            }
        await User.RemoveVehicles(id,vehicle)
        return res.status(200).json({ message: 'Vehicle Has Ben Removed successfully' })
    
}

export async function AddUserChat(req,res)
{
   
const {id}=req.params
    let user = await User.AllUsers(id);
     if(!user)
        {
          return res.status(404).json({ message: 'User Not Found' })

        }
        const {message,time,sender}=req.body
        if(!message||!time||!sender)
        {
            return res.status(400).json({ message: "missing data" })
        }
        const chat={message:message,time:time,sender:sender}
      
        await User.AddChat(chat,id)
        return res.status(200).json({ message: 'Chat Has Ben Added successfully' })
        

        
}
export async function UpdateToken(req,res)
{
    const {id}=req.params
    let user = await User.AllUsers(id);
    if(!user)
    {
        return res.status(404).json({ message: 'User Not Found' })

    }
    const {token}=req.body  
    if(!token){
        return res.status(400).json({ message: "missing data" })
    
    }
    await User.UpdateToken(id,token)
    return res.status(200).json({ message: 'Token Has Ben Updated successfully' })

}
export async function DeleteToken(req,res)
{
    const {id}=req.params
    let user = await User.AllUsers(id);
    if(!user)
    {
        return res.status(404).json({ message: 'User Not Found' })

    }
    await User.UpdateToken(id,null)
    return res.status(200).json({ message: 'Token Has Ben Deleted successfully' })

}




