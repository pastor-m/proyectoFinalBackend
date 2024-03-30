import { Router } from "express";
const router = Router();

import ProductsModel from "../models/products.models.js";

//Obtenemos todos los productos
router.get("/", async (req,res)=>{
    
    try {
        const limit = req.query.limit;
        const page = req.query.page || 1;
        let filter;
        const user = req.session.user;
        
        if (limit || page && req.query.category != undefined && req.query.stock != undefined){
            const products = await ProductsModel.paginate({}, {limit, page})
            // products[1]._id
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return {_id, ...rest};
            })
            
            res.render("products", {
                products: productsResult,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                limit: products.limit,
                prevLink: products.prevLink,
                nextLink: products.nextLink,
                id: productsResult._id,
                user: user
            })
        }

        else if (req.query.category == undefined && req.query.stock != undefined){
            filter = req.query.stock
            const products = await ProductsModel.paginate({"stock": {$gte:filter}}, {limit: 10, page: 1})

            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            
            res.render("products", {
                products: productsResult,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                limit: products.limit,
                user: user
            })
        }

        else if (req.query.category != undefined && req.query.stock == undefined){
            filter = req.query.category;
            const products = await ProductsModel.paginate({"category": filter}, {limit: 10, page: 1})
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            
            res.render("products", {
                products: productsResult,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                limit: products.limit,
                user: user
            })
        }


        else if (limit || page && req.query.category == undefined && req.query.stock == undefined && req.query.sort != undefined){
            if (req.query.sort == 'asc'){
                const products = await ProductsModel.paginate({}, {sort: {"price": 'asc'}, limit:10, page: 1});
                const productsResult = products.docs.map(product => {
                    const {_id, ...rest} = product.toObject();
                    
                    return rest;
                })
                
                res.render("products", {
                    products: productsResult,
                    hasPrevPage: products.hasPrevPage,
                    hasNextPage: products.hasNextPage,
                    prevPage: products.prevPage,
                    nextPage: products.nextPage,
                    currentPage: products.page,
                    totalPages: products.totalPages,
                    limit: products.limit,
                    user: user
                })
            } else if(req.query.sort == 'desc'){
                const products = await ProductsModel.paginate({}, {sort: {"price": 'desc'}, limit:10, page: 1});
                console.log(products)
                const productsResult = products.docs.map(product => {
                    const {_id, ...rest} = product.toObject();
                    
                    return rest;
                })
                
                res.render("products", {
                    products: productsResult,
                    hasPrevPage: products.hasPrevPage,
                    hasNextPage: products.hasNextPage,
                    prevPage: products.prevPage,
                    nextPage: products.nextPage,
                    currentPage: products.page,
                    totalPages: products.totalPages,
                    limit: products.limit,
                    user: user
                })
            }
 
        }

        else if (!limit || page && req.query.category == undefined && req.query.stock == undefined && req.query.sort == undefined){
            const products = await ProductsModel.paginate({}, {limit: 10, page: 1})
            const productsResult = products.docs.map(product => {
                const {_id, ...rest} = product.toObject();
                
                return rest;
            })
            
            res.render("products", {
                products: productsResult,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                limit: products.limit,
                id: productsResult._id,
                user: user
            })
        }
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