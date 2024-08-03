import transport from "../services/mail.service.js";
import UserModel from "../models/users.model.js";

class UsersService {
    async getUsers(pageq){
        try {
            const limit = 10;
            const page = pageq ||1;
            const users = await UserModel.paginate({},{limit,page})
            const usersResult = users.docs.map(user =>{
                const {_id, ...rest} = user.toObject();
                return {_id, ...rest}
            })
            return {
                users,
                usersResult
            }
        } catch (error) {
            throw new Error("Error while getting users")
        }
    }

    async getUserById(uid){
        try {
            const user = await UserModel.findById(uid);
            if(!user){
                res.send({message:"No user found"});
            }
            return user
        } catch (error) {
            throw new Error("Error while getting user")
        }
    }

    async updatePassword(email, newPassword){
        try {
            const user = await UserModel.findOneAndUpdate({email:email}, {password: newPassword})
            console.log("usuario actualizado",user)
        } catch (error) {
            throw new Error("Error while updating the password")
        }
    }
    
    async updateRole(email,role){
        try {
            console.log(email,role);
            const userUpdated = await UserModel.findOneAndUpdate({email:email}, {role: role});
            return ({message: "User updated"});
            // if(user.role === 'premium'){
            //     await UserModel.findOneAndUpdate({email:email}, {role: 'user'})
            //     return res.status(200).send({message: "User updated"});
            // } else if(user.role === 'user' && user.documents.includes({name: 'identificacion'}) && user.documents.includes({name: 'comprobante de domicilio'}) && user.documents.includes({name: 'estado de cuenta'})){
            //     await UserModel.findOneAndUpdate({email:email}, {role: 'premium'})
            //     return res.status(200).send({message: "User updated"});
            // } else {
            //     return res.status(200).send({message: "User not updated"}); 
            // }
        } catch (error) {
            res.send({message:"No user found"});
        }
    }

    async updateDocs(userId,docName){
        try {
            const user  = await UserModel.findById({_id:userId})
            const docsArray = user.documents;
            docsArray.push(docName)
            await UserModel.findByIdAndUpdate({_id:userId}, {documents: docsArray})
            
        } catch (error) {
            throw new Error("Error while updating the documents service")
        }
    }

    async updateDate(email){
        try {
            const user = await UserModel.findOneAndUpdate({email:email}, {last_connection: new Date()})
            // console.log(user.last_connection)
        } catch (error) {
            throw new Error("Error while updating the last connection")
        }
    }

    async deleteUsers(currentDate){
        const twoDays = 2 * 24 * 60 * 60 * 1000;
        const halfHour = 30 * 60 * 1000;
        const thritySeconds = 30 * 1000;
        try {
            let dateComp = new Date(currentDate.getTime() - thritySeconds)
            console.log(dateComp)
            const emailArray = await UserModel.find({"last_connection":{$lt: dateComp}})
            for (let i = 0; i < emailArray.length; i++) {
                const email = emailArray[i].email;
                transport.sendMail({
                    from: "Coder Email <pastor.ml09@gmail.com>",
                    to: email,
                    subject: "Cuenta eliminada",
                    html: `<h1>Cuenta eliminada</h1>
                            <p>Su cuenta ha sido eliminada por inactividad.</p>`
                })
            }
            const deletedUsers = await UserModel.deleteMany({"last_connection":{$lt: dateComp}})
            console.log(deletedUsers)
            if(deletedUsers.acknowledged == true && deletedUsers.deletedCount > 0){
                return deletedUsers
            } else if (deletedUsers.acknowledged == true || false && deletedUsers.deletedCount == 0){
                return res.send({message: "No users found"}); 
            }
            
        } catch (error) {
            return res.send({message: "No users found"});
        }
    }

    async deleteUser(uid){
        try {
            const userDeleted = await UserModel.findByIdAndDelete(uid);
            return userDeleted
        } catch (error) {
            return res.send({message: "No user found"});
        }
    }
}

export default UsersService