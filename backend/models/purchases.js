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
    amount: {
        type: Number,
        required: true
    },
    date_of_purchase: {
        type: Date,
        required: true
    },
    games_purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    }]
}, {
    timestamps: true
});

const Purchase = mongoose.model("Purchase", purchasesSchema);

export default Purchase;