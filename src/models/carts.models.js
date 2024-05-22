import mongoose from "mongoose";

// Define a schema for the product entry in the cart
const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 // Default quantity is 1 if not specified
    }
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
    products: [productInCartSchema]
});

const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel;