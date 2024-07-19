import { Router } from "express"
const router = Router();
import UserController from "../controller/user.controller.js";
const userController = new UserController();
import upload from "../utils/fileUploader.js";

// router.get('/premium', async(req,res)=>{

// })

router.post('/premium/:uid',userController.updateRole);

router.post('/:uid/documents', upload.fields([{name:'document'},{name:'product'},{name:'profile'}]),userController.addDocs);

export default router;