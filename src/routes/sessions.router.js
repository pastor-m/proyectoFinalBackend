import { Router } from "express";
const router = Router();
import UserModel from "../models/users.model.js";

//Register
router.post("/", async (req,res)=>{
    const {first_name, last_name, email, password, age} = req.body;
    
    try {
        const userExists = await UserModel.findOne({email: email});
        if(userExists){
            return res.status(400).send("Email is already registered")
        } else if (!userExists && email == "adminCoder@coder.com" && password == "adminCod3r123"){

            const newUser = await UserModel.create({first_name, last_name, email, password, age, role: "admin"});

            req.session.login = true;
            req.session.user = {...newUser._doc}
            res.redirect("/profile")
            
        } else {
            const newUser = await UserModel.create({first_name, last_name, email, password, age, role: "user"});

            req.session.login = true;
            req.session.user = {...newUser._doc}
            res.redirect("/profile")
        }

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }

})

//Login
router.post("/login", async (req,res)=>{
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email: email});
        if(user){
            if(user.password === password){
                
                req.session.login = true;
                req.session.user = {
                    email: user.email,
                    age: user.age,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role
                }
                res.redirect("/products")
            } else{
                res.status(401).send("Incorrect password")
            }
        }else{
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

//Logout

router.get("/logout", async (req,res)=>{
    if(req.session.login){
        req.session.destroy();
    }
    res.redirect("/login")
})

export default router;