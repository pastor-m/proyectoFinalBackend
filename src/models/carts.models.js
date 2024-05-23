import mongoose from "mongoose";


const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1 
    }
});


const cartSchema = new mongoose.Schema({
    products: [productInCartSchema]
});

const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel;