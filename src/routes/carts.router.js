import { Router } from "express";
import CartsController from "../controller/carts.controller.js";
const cartsController = new CartsController();
const router = Router();

import CartsModel from "../models/carts.models.js";

//Ver carrito
router.get("/:cid", cartsController.getCart);

//Agregar un carrito nuevo
router.post("/", cartsController.addCart);

//Agregar productos al carrito
router.post("/:cid/product/:pid", cartsController.addCartProd)

//Eliminar productos del carrito
router.delete("/:cid/product/:pid", cartsController.deleteCartProd)

router.put("/:cid", cartsController.updateCart)

router.put("/:cid/product/:pid", cartsController.updateProdQty)

export default router