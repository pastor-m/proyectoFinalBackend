import session from "express-session";
import CartsModel from "../models/carts.models.js";
import TicketsService from "./tickets.services.js";
const ticketsService = new TicketsService()
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

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
            let cart = await CartsModel.findById(cartId).populate("products.product").lean()
            return cart
        } catch (error) {
            throw new Error("Error while getting a cart")
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

    async addCartProd(prodId,cartId,quantity){
        try {
            const newProduct = {
                product: prodId,
                quantity
            }
            let cart = await CartsModel.findById(cartId)
                .populate({
                    path: 'products.product',
                    model: 'products' 
                }).lean();
            let productsArray = cart.products;
            let foundProd = productsArray.find((obj)=>(obj.product._id.valueOf()) == prodId)
            let foundProdIndex = productsArray.findIndex((obj)=>(obj.product._id.valueOf()) == prodId)
            if(foundProd != undefined){
                productsArray[foundProdIndex].quantity = parseInt(productsArray[foundProdIndex].quantity) + parseInt(quantity);
                const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
            } else {
                cart.products.push(newProduct);
                const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
            }

            // res.send({message:"New product added"});
        } catch (error) {
            throw new Error("Error while adding a product to the cart")
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
                        
                        let mongUp = await CartsModel.findByIdAndUpdate(cartId, {products: updatedCart});
                    }
                }

                const code =  uuidv4()
                
                const totAmount = (prods) =>{
                    return prods.reduce((total,item) => total + item.product.price * item.quantity,0)
                }

                const newTicket = await ticketsService.addTicket({
                    code: code,
                    purchase_datetime: new Date(),
                    products: checkoutCart,
                    amount: totAmount(checkoutCart),
                    purchaser: session.user._id
                })

                console.log(newTicket)
                
            return newTicket;
        } catch (error) {
            console.error("Error while updating the cart", error);
            throw new Error("Error while updating the cart")
        }
    }
}

export default CartsService;