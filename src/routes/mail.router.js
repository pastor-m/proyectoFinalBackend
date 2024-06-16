import { Router } from "express"
const router = Router();
import ResetPassController from "../controller/resetPass.controller.js";
const resetPassController = new ResetPassController();


router.get("/", async (req, res)=>{

    res.render("resetPassMail")

})

router.post("/reset", resetPassController.sendMail);

export default router