import CartsService from "../services/carts.service.js";
import ProductsService from "../services/products.service.js";
import UserModel from "../models/users.model.js";
const cartsService = new CartsService();
const productsService = new ProductsService();

class CartsController {
    async getCart(req, res){
        try {
            let cart = await cartsService.getCart(req.params.cid);
            console.log(cart)
            res.render("carts", {
                products: cart.products,
                cartId: cart._id
            })
        } catch (error) {
            res.status(500).json({message:"Server error"})
        }
    }

    async addCart(req, res){
        const newCart = req.body;
        try {
            await cartsService.addCart(newCart);
            res.send({message:"New cart added"});
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    }

    async addCartProd(req,res){
        
        try {
            let productToAdd = await productsService.getProdById(req.params.pid);
            if(req.session.user.role === 'premium'){
                if(productToAdd.owner === req.session.user._id){
                    return res.status(300).send({message: "User not allowed to add product"})
                } else {
                    await cartsService.addCartProd(req.params.pid,req.params.cid, req.body.quantity);
                    return res.send({message:"New product added"});
                }
            } else {
                await cartsService.addCartProd(req.params.pid,req.params.cid, req.body.quantity);
            }
           return res.send({message:"New product added"});
        } catch (error) {
            res.status(500).json({message: "Server error"})
        }
    }

    async deleteCartProd(req,res){
        try {
            await cartsService.deleteCartProd(req.params.pid,req.params.cid);
            res.send({message:"Product deleted"});
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    }

    async updateCart(req,res){
        try {
            await cartsService.updateCart(req.params.body,req.params.cid)
            res.send({message:"Cart updated"});
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    }

    async updateProdQty(req,res){
        try {
            await cartsService.updateProdQty(req.params.body,req.params.cid)
            res.send({message:"Product quantity updated"});
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    }

    async cartPurchase(req,res){
        try {
            const user = await UserModel.findOne({email:req.session.user.email})
            await cartsService.cartPurchase(req.params.cid, user._id)
            res.send({message:"Cart Purchase"});
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    }
}

export default CartsController