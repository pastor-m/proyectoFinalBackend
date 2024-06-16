import { Router } from "express"
const router = Router();
import {authToken} from "../utils/JWT.js"
import ResetPassController from "../controller/resetPass.controller.js";
const resetPassController = new ResetPassController();


router.get("/:active_token", async (req, res)=>{

    res.render("resetPass",{active_token: req.query})

})

router.post("/",authToken,resetPassController.resetPassword);

export default router

