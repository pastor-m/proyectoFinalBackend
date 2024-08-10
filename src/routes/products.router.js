import { Router } from "express";
const router = Router();
import ProductsController from "../controller/products.controller.js";
import adminValidation from "../middleware/adminValidation.js";
const productsController = new ProductsController();


//Obtenemos todos los productos
router.get("/", productsController.getProds);

//Obtenemos producto por su id
router.get("/:pid", productsController.getProdById);

//Agregamos producto
router.post("/", productsController.addProd);

//Actualizamos producto
router.put("/:pid",productsController.updateProd);

//Eliminamos producto
router.post("/deleteProd/:pid", productsController.deleteProd)


export default router