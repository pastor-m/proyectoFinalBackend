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
                await UserModel.findOneAndUpdate({email:email}, {role: 'user'})
                return res.status(200).send({message: "User updated"});
            } else if(user.role === 'user' && user.documents.includes({name: 'identificacion'}) && user.documents.includes({name: 'comprobante de domicilio'}) && user.documents.includes({name: 'estado de cuenta'})){
                await UserModel.findOneAndUpdate({email:email}, {role: 'premium'})
                return res.status(200).send({message: "User updated"});
            } else {
                return res.status(200).send({message: "User not updated"}); 
            }
        } catch (error) {
            throw new Error("Error while updating the role")
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
            console.log(user.last_connection)
        } catch (error) {
            throw new Error("Error while updating the last connection")
        }
    }
}

export default UsersService