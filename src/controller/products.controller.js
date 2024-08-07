import ProductsService from "../services/products.service.js";
import premiumProdEmail from "../middleware/premiumProdEmail.js";
import passport from "passport";
import CustomError from "../services/errors/custom-error.js";
import { Errors } from "../services/errors/enum.js";
import infoError from "../services/errors/info.js";
const productsService = new ProductsService();

class ProductsController {

    async getProds(req, res){
        
        try {
            const user = req.session.user;
            let result = await productsService.getProds(req.query.limit,req.query.page,req.session.user,req.query.category,req.query.stock,req.query.sort)
            res.render("products", {
            products: result.productsResult,
            hasPrevPage: result.products.hasPrevPage,
            hasNextPage: result.products.hasNextPage,
            prevPage: result.products.prevPage,
            nextPage: result.products.nextPage,
            currentPage: result.products.page,
            totalPages: result.products.totalPages,
            limit: result.products.limit,
            prevLink: result.products.prevLink,
            nextLink: result.products.nextLink,
            id: result.productsResult._id,
            user: user
            })
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    //Obtenemos producto por ID
    async getProdById(req, res){
        try {
            const user = req.session.user;
            let product = await productsService.getProdById(req.params.pid)
            res.render("product",{
                id: product._id,
                title: product.title,
                description: product.description,
                category: product.category,
                stock: product.stock,
                thumbnail: product.thumbnail,
                price: product.price
            })
        } catch (error) {
            
            res.status(500).json({message:"Server error"})
        }
    }

    async addProductView(req,res){
        try {
            return res.render("addProdView")
        } catch (error) {
            console.log("error aqui1")
        }
    }

    //Agregamos producto
    async addProd(req, res){
        try {
            const newProd =  await productsService.addProd(req.body, req.session.user);
            res.send({message: "New product added"});
            return newProd
        } catch (error) {
            res.status(500).json({message:"Server error"});
        }
    }

    //Actualizamos producto
    async updateProd(req,res){
        try {
            await productsService.updateProd(req.params.pid, req.body);
            return res.status(200).send({message: "Product updated"});
        } catch (error) {
            res.status(500).json({message:"Server error"});
        }
    }

    //Eliminamos producto
    async deleteProd(req,res){
        try {
            const prodToDelete = await productsService.getProdById(req.params.pid)
            if(req.session.user.role === 'premium'){
                if(prodToDelete.owner.role === 'premium'){
                    premiumProdEmail(req.session.user.email,prodToDelete)
                    await productsService.deleteProd(req.params.pid);
                    return res.status(200).send({message: "Product deleted"});
                } else {
                    return res.status(300).send({message: "Product can't be deleted"});
                }
            } else if (req.session.user.role === 'admin'){
                await productsService.deleteProd(req.params.pid);
                return res.status(200).send({message: "Product deleted"});
            } else {
                return res.status(300).send({message: "Product can't be deleted"});
            }
            
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }


}

export default ProductsController