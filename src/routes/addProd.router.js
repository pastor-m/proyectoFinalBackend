import { Router } from "express";
const router = Router();
import ProductsController from "../controller/products.controller.js";
const productsController = new ProductsController();

//Agregar un producto
router.get("/", productsController.addProductView);

export default router