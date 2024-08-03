import { Router } from "express"
const router = Router();
import UserController from "../controller/user.controller.js";
const userController = new UserController();
import upload from "../utils/fileUploader.js";
import adminValidation from "../middleware/adminValidation.js";

// router.get('/premium', async(req,res)=>{

// })
router.get('/', userController.getUsers);

router.get('/:uid',userController.getUserById);

router.post('/premium/:uid',adminValidation, userController.updateRole);

router.post('/:uid/documents', upload.fields([{name:'document'},{name:'product'},{name:'profile'}]),userController.addDocs);

router.delete('/',userController.deleteUsers);

router.post('/:uid', userController.deleteUserById);

export default router;