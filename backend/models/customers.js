import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
    c_name: {
        type: String,
    },
    c_username: {
        type: String
    },
    c_email: {
        type: String
    },
    c_password: {
        type: String
    },
    is_owner: {
        type: Boolean
    },
    c_games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Game"
        }
    ]
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", customersSchema);

export default Customer;