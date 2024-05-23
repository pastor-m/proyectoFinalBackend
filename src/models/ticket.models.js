import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => uuidv4(),
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
    purchaser: {
        type: String,
        required: true
    }
});

const TicketModel = mongoose.model("ticket", ticketSchema);

export default TicketModel