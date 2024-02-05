import mongoose from "mongoose";

const purchasesSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    amount: {
        type: Number
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