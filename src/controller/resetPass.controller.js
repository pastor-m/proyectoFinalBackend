import transport from "../services/mail.service.js";
import {generateToken, authToken} from "../utils/JWT.js"
import UsersService from "../services/users.service.js";
const usersService = new UsersService();


class ResetPassController {
    async sendMail(req,res){
        try {
            const email = req.body;
            const active_token = generateToken(email)
            res.cookie('auth',active_token)
            res.header('authorization',active_token)
        
            transport.sendMail({
                from: "Coder Test <pastor.ml09@gmail.com>",
                to: "paenmolo@hotmail.com",
                subject: "Correo de prueba",
                html: `<h1>Reset password</h1>
                    <a>http://localhost:8080/resetPass/${active_token}</a>
                    `
            })
        
            res.send("Mail successfully sent");
        
        } catch (error) {
            res.status(500).send("Error while sending email")
        }

    }

    async resetPassword(req,res){
        try {
            const email = req.body.email;
            const newPassword = req.body.password1;

            usersService.updatePassword(email, newPassword)

            res.send("Password updated successfully")

            
        } catch (error) {   
            res.status(500).send("Error while updating password")
        }
    }

}

export default ResetPassController
