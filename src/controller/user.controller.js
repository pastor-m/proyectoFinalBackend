import UsersService from "../services/users.service.js";
import UserModel from "../models/users.model.js";
const usersService = new UsersService();

class UserController {
    async getUsers(req,res){
        try {
            let usersRes = await usersService.getUsers(req.query.page)
            console.log(usersRes)

            res.render("users",{
                users: usersRes.usersResult,
                hasPrevPage: usersRes.users.hasPrevPage,
                hasNextPage: usersRes.users.hasNextPage,
                prevPage: usersRes.users.prevPage,
                nextPage: usersRes.users.nextPage,
                currentPage: usersRes.users.page,
                totalPages: usersRes.users.totalPages,
                prevLink: usersRes.users.prevLink,
                nextLink: usersRes.users.nextLink,
                name: usersRes.usersResult.first_name,
                email: usersRes.usersResult.email,
                role: usersRes.usersResult.role,
                result: usersRes
            })

        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    async getUserById(req,res){
        try {
            let user = await usersService.getUserById(req.params.uid)
            res.render("user",{
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                email: user.email,
                role: user.role
            })
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    async updateRole(req,res){
        try {
            const userId = req.params.uid;
            const roleToAdd = req.body.roles;
            const user  = await UserModel.findById({_id:userId})
            usersService.updateRole(user.email,roleToAdd)
            return res.send({message:"Role has been updated"})
        } catch (error) {
            throw new Error("Error while updating the role controller")
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
            // console.log(userEmail)
            await usersService.updateDate(userEmail)

        } catch (error) {
            // console.log("error update Date")
            throw new Error("Error while updating the date")
        }
    }

    async deleteUsers(req,res){
        //Eliminamos usuarios que no hayan iniciado sesion en 2 dias
        try {
            let currentDate = new Date();
            console.log(await usersService.deleteUsers(currentDate))
            res.send("Users deleted")
        } catch (error) {
            res.status(200).json({message:"Error while deleting users"})
        }
    }

    async deleteUserById(req,res){
        try {
            await usersService.deleteUser(req.params.uid)
            res.send("User deleted")
        } catch (error) {
            res.status(200).json({message:"Error while deleting user"})
        }
    }
}

export default UserController