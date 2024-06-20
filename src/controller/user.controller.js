import UsersService from "../services/users.service.js";
import UserModel from "../models/users.model.js";
const usersService = new UsersService();

class UserController {
    async updateRole(req,res){
        try {
            const userId = req.params.uid;
            const user  = await UserModel.findById({_id:userId})
            usersService.updateRole(user.email)
        } catch (error) {
            throw new Error("Error while updating the role")
        }
    }
}

export default UserController