import { Router } from "express"
const router = Router();
import UserController from "../controller/user.controller.js";
const userController = new UserController();

// router.get('/premium', async(req,res)=>{

// })

router.post('/premium/:uid',userController.updateRole);