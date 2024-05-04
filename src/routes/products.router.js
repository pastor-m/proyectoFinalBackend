import { Router } from "express";
const router = Router();

import ProductsModel from "../models/products.models.js";
import ProductsController from "../controller/products.controller.js";
const productsController = new ProductsController();


//Obtenemos todos los productos
router.get("/", productsController.getProds);

//Obtenemos producto por su id
router.get("/:pid", productsController.getProdById);

//Agregamos producto
router.post("/", productsController.addProd);

//Actualizamos producto
router.put("/:pid", productsController.updateProd);


//Eliminamos producto
router.delete("/:pid", productsController.deleteProd)

export default router