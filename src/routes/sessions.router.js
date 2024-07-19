import { Router } from "express"
const router = Router()
import UsersService from "../services/users.service.js";
const usersService = new UsersService();
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

    usersService.updateDate(req.user.email)

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
        usersService.updateDate(req.user.email)
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