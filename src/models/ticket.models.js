import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},{_id: false})

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now()
    },
    amount: {
        type: Number,
        required: true,
        index: true,
    },
    products: [productSchema],
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const TicketModel = mongoose.model("ticket", ticketSchema);

export default TicketModel