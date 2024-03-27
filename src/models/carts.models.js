import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    }]
})

const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel;