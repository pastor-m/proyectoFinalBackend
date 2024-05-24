import CartsService from "../services/carts.service.js";
const cartsService = new CartsService();

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
            await cartsService.addCartProd(req.params.pid,req.params.cid, req.body.quantity);
            res.send({message:"New product added"});
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
            await cartsService.cartPurchase(req.params.cid)
            res.send({message:"Cart Purchase"});
        } catch (error) {
            res.status(500).json({message: "Server error"});
        }
    }
}

export default CartsController