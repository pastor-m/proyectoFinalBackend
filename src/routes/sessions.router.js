import { Router } from "express";
const router = Router();
import UserModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js"
import passport from "passport";


//Register
router.post("/", passport.authenticate("register", {
    failureRedirect: "/sessions/failedregister"}), async(req,res)=> {
        
        if(!req.user)return res.status(400).send("Invalid credentials"); 
            
            req.session.user = {
                email: req.user.email,
                age: req.user.age,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                cart: req.user.cart,
                role: "admin"
            };

            req.session.login = true;

            res.redirect("/profile")
        
    }
)

router.get("/failedregister", async(req, res)=>{
    res.send("Failed register");
})


// router.post("/", async (req,res)=>{
//     const {first_name, last_name, email, password, age} = req.body;
    
//     try {
//         const userExists = await UserModel.findOne({email: email});
//         if(userExists){
//             return res.status(400).send("Email is already registered")
//         } else if (!userExists && email == "adminCoder@coder.com" && password == "adminCod3r123"){

//             const newUser = await UserModel.create({first_name, last_name, email, password: createHash(password), age, role: "admin"});
            
//             req.session.login = true;
//             req.session.user = {...newUser._doc}
//             res.redirect("/profile")
            
//         } else {
//             const newUser = await UserModel.create({first_name, last_name, email, password: createHash(password), age, role: "user"});

//             req.session.login = true;
//             req.session.user = {...newUser._doc}
//             res.redirect("/profile")
//         }

//     } catch (error) {
//         res.status(500).json({message: "Server error"})
//     }

// })

//Login

// router.post("/login", async (req,res)=>{
//     const {email, password} = req.body;

//     try {
//         const user = await UserModel.findOne({email: email});
//         if(user){
//             // if(user.password === password)
//             if(isValidPassword(password,user)){
                
//                 req.session.login = true;
//                 req.session.user = {
//                     email: user.email,
//                     age: user.age,
//                     first_name: user.first_name,
//                     last_name: user.last_name,
//                     role: user.role
//                 }
//                 res.redirect("/products")
//             } else{
//                 res.status(401).send("Incorrect password")
//             }
//         }else{
//             res.status(404).send("User not found")
//         }
//     } catch (error) {
//         res.status(500).json({message: "Server error"})
//     }
// })

router.post("/login", passport.authenticate("login", {failureRedirect: "/sessions/failedlogin" }), async (req,res) =>{
    if(!req.user) {
        return res.status(400).send("Invalid credentials");
    }
    
    else {
    req.session.user = {
        email: req.user.email,
        age: req.user.age,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        role: req.user.role
    };

    req.session.login = true;

    req.session.save()

    console.log("session login",req.session.user)

    res.redirect("/products")

    }
})



router.get("/failedlogin", async (req,res)=>{
    res.send("Failed login");
})

//Logout

router.get("/logout", async (req,res)=>{
    if(req.session.login){
        req.session.destroy();
    }
    res.redirect("/login")
})


//Version para Github:
router.get("/github", passport.authenticate("github", {scope: ["user.email"]}), async(req,res)=>{})

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/login"}), async(req,res)=>{
    console.log(req.user.first_name)
    req.session.user = req.user;
    req.session.login = true;

    console.log("session login github",req.session.user)

    res.redirect("/profile");
})
export default router;