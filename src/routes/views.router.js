import { Router } from "express";
const router = Router();

router.get("/register", async (req,res)=>{
    if(req.session.login){
        return res.redirect("profile")
    }
    res.render("register");
})

router.get("/login", async (req,res)=>{
    if(req.session.login){
        return res.redirect("/profile")
    }
    res.render("login");
})

router.get("/profile", async(req,res)=>{
    if(!req.session.login){
        return res.redirect("/login");
    }
    res.render("profile", {user: req.session.user});
})

export default router;