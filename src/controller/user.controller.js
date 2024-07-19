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

    async addDocs(req,res){
        try {
            const userId = req.params.uid;
            const doc = {
                name: req.files.document[0].filename,
                reference: req.files.document[0].path
            }
            const prod = {
                name: req.files.product[0].filename,
                reference: req.files.product[0].path
            }
            const prof = {
                name: req.files.profile[0].filename,
                reference: req.files.profile[0].path
            }
            await usersService.updateDocs(userId,doc)
            await usersService.updateDocs(userId,prod)
            await usersService.updateDocs(userId,prof)
            res.send("Document uploaded")
        } catch (error) {
            throw new Error("Error while uploading documents controller")
        }
    }

    async updateDate(req,res){
        try {
            const userEmail =  req.session.user.email;
            console.log(userEmail)
            await usersService.updateDate(userEmail)

        } catch (error) {
            console.log("error update Date")
            throw new Error("Error while updating the date")
        }
    }
}

export default UserController