import mongoose from "mongoose";

const purchasesSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    // for trigger
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date_of_purchase: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

const Purchase = mongoose.model("Purchase", purchasesSchema);

export default Purchase;