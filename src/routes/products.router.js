import { Router } from "express";
const router = Router();

import ProductsModel from "../models/products.models.js";

//Obtenemos todos los productos
router.get("/", async (req,res)=>{
    try {
        const products = await ProductsModel.find();
        res.json(products)
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})
//Obtenemos producto por su id
router.get("/:pid", async (req,res)=>{
    try {
        const products = await ProductsModel.findById(req.params.pid)
        if(!products){
            return res.status(404).send({message:"Product not found"})
        }
        res.json(products)
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

//Agregamos producto
router.post("/", async (req, res)=>{
    try {
        const newProduct = new ProductsModel(req.body);
        await newProduct.save();
        res.send({message: "New product added"})
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

//Actualizamos producto
router.put("/:pid", async (req,res)=>{
    try {
        const product = await ProductsModel.findByIdAndUpdate(req.params.pid, req.body);
        if(!product){
            return res.status(404).send({message:"Product not found"});
        }
        return res.status(200).send({message: "Product updated"});
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})


//Eliminamos producto
router.delete("/:pid", async (req,res)=>{
    try {
        const product = await ProductsModel.findByIdAndDelete(req.params.pid);
        if(!product){
            return res.status(404).send({message:"Product not found"});
        }
        return res.status(200).send({message: "Product deleted"});
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
})

export default router