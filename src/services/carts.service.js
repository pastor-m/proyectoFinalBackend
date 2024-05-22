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
                prodId,
                quantity
            }
            console.log(newProduct)
            const cart = await CartsModel.findById(cartId);
            cart.products.push(newProduct);
            console.log(cart)
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
                return element == productToDelete;
            });
            let updatedProducts = productsArray.splice(0,prodIndex);
            cart = await CartsModel.findByIdAndUpdate(cartId,{products: updatedProducts})
            return cart
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
            // let cart = await CartsModel.findById(cartId)
            //                            .populate("products.product")
            //                            .lean();
            // console.log("Populated cart:", cart.products[0]._id);
            let cart = await CartsModel.findById(cartId);
            console.log("Cart before populate:", cart);
            let cart2 = await CartsModel.findById(cartId)
                                   .populate('products.product')
                                   .lean(); // lean() para obtener un objeto JavaScript plano
            console.log("Cart after populate:", cart2);
            CartsModel.findOne()
                .populate({
                    path: 'products.product',
                    model: 'products' // Asegúrate de que este modelo corresponda al usado para los productos.
                })
                .then(cart => console.log(cart))
                .catch(err => console.error(err));
            return cart;
        } catch (error) {
            console.error("Error while updating the cart", error);
            throw new Error("Error while updating the cart");
        }
    }
}

export default CartsService;