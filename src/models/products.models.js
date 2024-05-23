import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        index: true,
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String
    },
    category: {
        type: String,
        required: true
    }
});

productSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model("products", productSchema);

export default ProductsModel