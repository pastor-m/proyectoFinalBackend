import UserModel from "../models/users.model.js";

class UsersService {
    async updatePassword(email, newPassword){
        try {
            const user = await UserModel.findOneAndUpdate({email:email}, {password: newPassword})
            console.log("usuario actualizado",user)
        } catch (error) {
            throw new Error("Error while updating the password")
        }
    }
    
    async updateRole(email){
        try {
            const user = await UserModel.findOne({email:email})
            if(user.role === 'premium'){
                const user = await UserModel.findOneAndUpdate({email:email}, {role: 'user'})
                return res.status(200).send({message: "User updated"});
            } else if(user.role === 'user'){
                const user = await UserModel.findOneAndUpdate({email:email}, {role: 'premium'})
                return res.status(200).send({message: "User updated"});
            } else {
                return res.status(200).send({message: "User not updated"}); 
            }
        } catch (error) {
            throw new Error("Error while updating the role")
        }
    }
}

export default UsersService