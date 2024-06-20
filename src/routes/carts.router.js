import { Router } from "express";
import CartsController from "../controller/carts.controller.js";
const cartsController = new CartsController();
const router = Router();
import userValidation from "../middleware/userValidation.js";
import premiumValidation from "../middleware/premiumValidation.js";

// import CartsModel from "../models/carts.models.js";

//Ver carrito
router.get("/:cid", cartsController.getCart);

//Agregar un carrito nuevo
router.post("/", userValidation, cartsController.addCart);

//Agregar productos al carrito
router.post("/:cid/product/:pid", (userValidation || premiumValidation),cartsController.addCartProd)

//Eliminar productos del carrito
router.delete("/:cid/product/:pid", userValidation, cartsController.deleteCartProd)

router.put("/:cid", cartsController.updateCart)

router.put("/:cid/product/:pid", cartsController.updateProdQty)

router.post("/:cid/purchase", cartsController.cartPurchase)

export default router