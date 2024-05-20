import { Router } from "express";
const router = Router();
// import ProductsModel from "../models/products.models.js";
import ProductsController from "../controller/products.controller.js";
import adminValidation from "../middleware/adminValidation.js";
const productsController = new ProductsController();


//Obtenemos todos los productos
router.get("/", productsController.getProds);

//Obtenemos producto por su id
router.get("/:pid", productsController.getProdById);

//Agregamos producto
router.post("/",adminValidation, productsController.addProd);

//Actualizamos producto
router.put("/:pid", adminValidation, productsController.updateProd);


//Eliminamos producto
router.delete("/:pid", adminValidation, productsController.deleteProd)

export default router