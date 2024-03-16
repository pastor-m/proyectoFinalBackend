import { Router } from "express";
const router = Router();

import CartsModel from "../models/carts.models.js";

router.get("/:cid", async(req,res)=>{
    try {
        const cart = await CartsModel.findById(req.params.cid);
        if(!cart){
            return res.status(404).send({message:"Cart not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

router.post("/", async(req,res)=>{
    try {
        const newCart = new CartsModel(req.body);
        await newCart.save();
        res.send({message:"New cart added"});
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const newProduct = req.body;
        const cart = await CartsModel.findById(req.params.cid)
        cart.products = newProduct;
        const updatedCart = await CartsModel.findByIdAndUpdate(req.params.cid, cart)
        res.json(updatedCart)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

export default router