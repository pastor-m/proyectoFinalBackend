import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
        index: true,
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts",
        required: true
    },
    role: {
        type: String,
        required: true
    },
    documents: {
        type: Array,
        default: []
    }, last_connection: {
        type: Date,
    }
});

userSchema.plugin(mongoosePaginate)

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

