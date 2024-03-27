import { Router } from "express";
const router = Router();

import CartsModel from "../models/carts.models.js";

//Ver carrito
router.get("/:cid", async(req,res)=>{
    try {
        let cart = await CartsModel.findById(req.params.cid).populate("products").lean()
        res.render("carts", {
            products: cart.products,
            cartId: cart._id
        })
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

//Agregar un carrito nuevo
router.post("/", async(req,res)=>{
    try {
        const newCart = new CartsModel(req.body);
        await newCart.save();
        res.send({message:"New cart added"});
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

//Agregar productos al carrito
router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const newProduct = req.params.pid;
        const cart = await CartsModel.findById(req.params.cid);
        cart.products.push(newProduct);
        const updatedCart = await CartsModel.findByIdAndUpdate(req.params.cid, cart);
        res.send({message:"New product added"});
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

//Eliminar productos del carrito
router.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        const productToDelete = req.params.pid;
        let cart = await CartsModel.findById(req.params.cid);
        let productsArray = cart.products;
        let prodIndex = productsArray.findIndex((element) => {
            return element == productToDelete;
        });
        let updatedProducts = productsArray.splice(0,prodIndex);
        cart = await CartsModel.findByIdAndUpdate(req.params.cid,{products: updatedProducts})
        res.send({message:"Product deleted"});
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.put("/:cid", async(req, res)=>{
    try {
        const productsArray = req.params.body;
        let cart = await CartsModel.findById(req.params.cid);
        cart.products = productsArray;
        const updatedCart = await CartsModel.findByIdAndUpdate(req.params.cid, cart);
        res.send({message:"Cart updated"});
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.put("/:cid/product/:pid", async(req, res)=>{
    try {
        let cart = await CartsModel.findById(req.params.cid);

        if(cart.products.includes(req.params.pid)){
            let productsArray = cart.products;
            let prodIndex = productsArray.findIndex((element) => {
                return element == req.params.pid;
            });
            productsArray[prodIndex].stock = req.body;
            cart.products = productsArray
            const updatedCart = await CartsModel.findByIdAndUpdate(req.params.cid, cart);
            res.send({message:"Product quantity updated"});
        } else{
            res.send({message: "Product not found"})
        }

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.delete("/:cid", async(req,res)=>{
    try {
        let cart = await CartsModel.findById(req.params.cid);
        cart.products = []
        await CartsModel.findByIdAndUpdate(req.params.cid, cart)
        res.send({message: "Products deleted from cart"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})
export default router