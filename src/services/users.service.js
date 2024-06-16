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
}

export default UsersService