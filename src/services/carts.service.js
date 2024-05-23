import CartsModel from "../models/carts.models.js";

class CartsService {
    async addCart(cartData){
        try {
            const newCart = new CartsModel(cartData);
            return await newCart.save();
        } catch (error) {
            throw new Error("Error while creating a cart")
        }
    }

    async getCart(cartId) {
        try {
            let cart = await CartsModel.findById(cartId).populate("products").lean()
            return cart
            // res.render("carts", {
            //     products: cart.products,
            //     cartId: cart._id
            // })
        } catch (error) {
            throw new Error("Error while getting a cart")
        }
    }

    async addCartProd(prodId,cartId,quantity){
        try {
            const newProduct = {
                product: prodId,
                quantity
            }
            const cart = await CartsModel.findById(cartId);
            cart.products.push(newProduct);
            const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
            // res.send({message:"New product added"});
        } catch (error) {
            throw new Error("Error while adding a product to the cart")
        }
    }

    async deleteCartProd(prodId,cartId){
        try {
            const productToDelete = prodId;
            let cart = await CartsModel.findById(cartId);
            let productsArray = cart.products;
            let prodIndex = productsArray.findIndex((element) => {
                return element._id == productToDelete;
            });
            let updatedProducts = productsArray.splice(prodIndex,prodIndex);
            let updatedCart = await CartsModel.findByIdAndUpdate(cartId,{products: updatedProducts})
            return updatedCart
        } catch (error) {
            throw new Error("Error while deleting a product from the cart")
        }
    }

    async updateCart(prods, cartId){
        try {
            const productsArray = prods;
            let cart = await CartsModel.findById(cartId);
            cart.products = productsArray;
            const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
            return updatedCart
        } catch (error) {
            throw new Error("Error while updating the cart")
        }
    }

    async updateProdQty(cartId, prodId){
        try {
            let cart = await CartsModel.findById(cartId);
    
            if(cart.products.includes(prodId)){
                let productsArray = cart.products;
                let prodIndex = productsArray.findIndex((element) => {
                    return element == prodId;
                });
                productsArray[prodIndex].stock = req.body;
                cart.products = productsArray
                const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
                // res.send({message:"Product quantity updated"});
                return updatedCart
            } else{
                throw new Error("Product not found")
            }
    
        } catch (error) {
            throw new Error("Error while updating the cart")
        }
    }

    async cartPurchase(cartId){
        try {
            let updatedCart = [];
            let checkoutCart = [];
            let cart = await CartsModel.findById(cartId)
                .populate({
                    path: 'products.product',
                    model: 'products' 
                }).lean();
                for (let i = 0; i < cart.products.length; i++) {
                    if(cart.products[i].quantity < cart.products[i].product.stock){
                        checkoutCart.push(cart.products[i])
                    } else {
                        updatedCart = cart.products.splice(i);
                        console.log(cartId);
                        let mongUp = await CartsModel.findByIdAndUpdate(cartId, {products: updatedCart});
                    }
                }
            return checkoutCart;
        } catch (error) {
            console.error("Error while updating the cart", error);
            throw new Error("Error while updating the cart")
        }
    }
}

export default CartsService;